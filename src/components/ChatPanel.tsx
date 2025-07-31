'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Plus, Cloud, RefreshCw, MoreHorizontal, Hand, ChevronDown, CheckSquare, X, AtSign } from 'lucide-react';
import { useChat } from 'ai/react';
import { FileItem, getWorkspaceMode } from '@/lib/fileApi';
import { AI_MODELS } from '@/lib/chatApi';
import { processLocalFileOperation } from '@/lib/localFileHandler';

interface ChatPanelProps {
  files: FileItem[];
  onFileChange?: () => void; // Callback to refresh file list when AI makes changes
  queuedMessages?: Array<{
    id: string;
    element: string;
    message: string;
    timestamp: number;
  }>;
  onClearQueuedMessage?: (id: string) => void;
}

interface FileReference {
  name: string;
  content: string;
}

export function ChatPanel({ files, onFileChange, queuedMessages = [], onClearQueuedMessage }: ChatPanelProps) {
  const [mode, setMode] = useState<'manual' | 'auto'>('manual');
  const [provider, setProvider] = useState<'openai' | 'anthropic'>('openai');
  const [model, setModel] = useState('gpt-4o');
  const [fileContext, setFileContext] = useState<FileReference[]>([]);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isUpdatingFiles, setIsUpdatingFiles] = useState(false);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const [currentlyProcessing, setCurrentlyProcessing] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit: originalHandleSubmit, isLoading, setInput, append } = useChat({
    api: '/api/chat',
    fetch: async (input, options) => {
      const workspaceMode = getWorkspaceMode();
      console.log('useChat fetch: Adding workspace mode header:', workspaceMode);
      
      const headers = {
        ...options?.headers,
        'x-workspace-mode': workspaceMode,
      };
      
      console.log('useChat fetch: Headers being sent:', headers);
      
      return fetch(input, {
        ...options,
        headers,
      });
    },
    body: {
      model,
      provider,
      fileContext,
    },
    onToolCall: async ({ toolCall }) => {
      // Show that AI is performing an action
      console.log('AI is calling tool:', toolCall.toolName);
    },
    onFinish: async (message) => {
      // Check if any tools were called that might have changed files
      if (message.toolInvocations && message.toolInvocations.length > 0) {
        const fileOperations = message.toolInvocations.filter(inv => 
          ['createFile', 'updateFile', 'deleteFile'].includes(inv.toolName)
        );
        
        // Process local file operations if in local mode
        const workspaceMode = getWorkspaceMode();
        console.log('Current workspace mode in ChatPanel:', workspaceMode);
        console.log('File operations found:', fileOperations.length);
        
        if (workspaceMode === 'local') {
          console.log('Processing operations in local mode');
          for (const invocation of fileOperations) {
            console.log('Checking invocation:', invocation.toolName, 'state:', invocation.state);
            
            // Only process invocations that have completed (state === 'result')
            if (invocation.state === 'result' && invocation.result) {
              console.log('Invocation result structure:', JSON.stringify(invocation.result, null, 2));
              
              if (invocation.result.localOperation) {
                try {
                  console.log('Processing local file operation:', invocation.result);
                  await processLocalFileOperation(invocation.result);
                  console.log('Local file operation completed');
                } catch (error) {
                  console.error('Failed to process local file operation:', error);
                }
              } else {
                console.log('Not a local operation - localOperation flag:', invocation.result.localOperation);
              }
            } else {
              console.log('No result or invocation not completed. State:', invocation.state);
            }
          }
        } else {
          console.log('Not in local mode, skipping local operations');
        }
        
        if (fileOperations.length > 0 && onFileChange) {
          setIsUpdatingFiles(true);
          // Refresh files smoothly without page reload
          setTimeout(async () => {
            await onFileChange();
            setIsUpdatingFiles(false);
          }, 100); // Reduced delay for faster updates
        }
      }
    },
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle @ file references
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === '@') {
      setCursorPosition(e.currentTarget.selectionStart);
      setShowFileMenu(true);
    } else if (e.key === 'Escape') {
      setShowFileMenu(false);
    }
  };

  const addFileToInput = (file: FileItem) => {
    if (!file.content) return;
    
    const beforeCursor = input.slice(0, cursorPosition + 1); // Include the @
    const afterCursor = input.slice(cursorPosition + 1);
    const newInput = beforeCursor + file.name + ' ' + afterCursor;
    
    setInput(newInput);
    
    // Add to context if not already there
    if (!fileContext.find(f => f.name === file.name)) {
      setFileContext(prev => [...prev, { name: file.name, content: file.content! }]);
    }
    
    setShowFileMenu(false);
    inputRef.current?.focus();
  };

  const removeFileContext = (fileName: string) => {
    setFileContext(prev => prev.filter(f => f.name !== fileName));
  };

  const processQueuedMessages = async () => {
    if (isProcessingQueue || queuedMessages.length === 0) return;
    
    setIsProcessingQueue(true);
    
    for (const queuedMessage of queuedMessages) {
      setCurrentlyProcessing(queuedMessage.id);
      
      // Create the formatted message
      const formattedMessage = `[Element Inspector] ${queuedMessage.element}\n\n${queuedMessage.message}`;
      
      // Send the message
      await append({
        role: 'user',
        content: formattedMessage
      });
      
      // Wait for the response to complete
      await new Promise(resolve => {
        const checkCompletion = () => {
          if (!isLoading) {
            resolve(void 0);
          } else {
            setTimeout(checkCompletion, 500);
          }
        };
        checkCompletion();
      });
      
      // Clear this message from the queue
      if (onClearQueuedMessage) {
        onClearQueuedMessage(queuedMessage.id);
      }
      
      // Small delay between messages
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setCurrentlyProcessing(null);
    setIsProcessingQueue(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // If there are queued messages, process them first
    if (queuedMessages.length > 0) {
      await processQueuedMessages();
    }
    
    // Then send the regular input if there's any
    if (input.trim()) {
      originalHandleSubmit(e);
    }
  };

  const handleProviderChange = (newProvider: 'openai' | 'anthropic') => {
    setProvider(newProvider);
    const defaultModel = Object.keys(AI_MODELS[newProvider])[0];
    setModel(defaultModel);
    setIsModelMenuOpen(false);
  };

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting for messages
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 rounded text-xs">$1</code>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-2 flex justify-between items-center h-[32px] flex-shrink-0">
        <h2 className="font-medium p-2 text-foreground truncate">New Chat</h2>
        <div className="flex gap-1 items-center">
          <button 
            className="size-7 text-muted-foreground hover:text-foreground hover:bg-muted rounded"
            onClick={() => window.location.reload()}
          >
            <Plus size={16} />
          </button>
          <button className="size-7 text-muted-foreground hover:text-foreground hover:bg-muted rounded">
            <Cloud size={16} />
          </button>
          <button className="size-7 text-muted-foreground hover:text-foreground hover:bg-muted rounded">
            <RefreshCw size={16} />
          </button>
          <button className="size-7 text-muted-foreground hover:text-foreground hover:bg-muted rounded">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col h-[calc(100%-32px)] w-full">
        {messages.length === 0 ? (
          /* No messages - Input at top */
          <div className="flex-1 min-h-0">
            <div className="relative h-full overflow-hidden">
              <div className="size-full rounded-[inherit] overflow-y-auto">
                <div className="p-3 pt-1">
                  {/* Chat Input */}
                  <div className="border rounded-lg mb-3 opacity-100">
                    <div className="bg-muted/40 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-150">
                      <form onSubmit={handleSubmit} className="flex flex-col">
                        <div className="pt-2">
                          {/* Queued Messages Display */}
                          {queuedMessages.length > 0 && (
                            <div className="mb-2 mx-2">
                              <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                                <span>Inspection Queue ({queuedMessages.length})</span>
                                {isProcessingQueue && <span className="text-primary">Processing...</span>}
                              </div>
                              <div className="space-y-1 max-h-24 overflow-y-auto">
                                {queuedMessages.map((msg, index) => (
                                  <div key={msg.id} className={`text-xs p-2 bg-muted/50 border border-border rounded flex justify-between items-start ${
                                    currentlyProcessing === msg.id ? 'border-primary bg-primary/10' : ''
                                  }`}>
                                    <div className="flex-1 min-w-0">
                                      <div className="font-medium text-foreground mb-1 truncate">
                                        {index + 1}. {msg.element}
                                      </div>
                                      <div className="text-muted-foreground line-clamp-1">
                                        {msg.message}
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => onClearQueuedMessage?.(msg.id)}
                                      disabled={isProcessingQueue}
                                      className="ml-2 text-muted-foreground hover:text-foreground disabled:opacity-50 flex-shrink-0"
                                    >
                                      <X size={12} />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-1 px-2">
                            <button 
                              type="button"
                              className="h-7 rounded-md px-2 text-sm border bg-background hover:bg-accent flex items-center gap-1"
                              onClick={() => setShowFileMenu(!showFileMenu)}
                            >
                              <span className="text-muted-foreground">@</span>
                            </button>
                            
                            {/* File Context Display */}
                            {fileContext.map((file) => (
                              <button 
                                key={file.name}
                                type="button"
                                className="h-7 rounded-md px-2 text-sm border bg-background hover:bg-accent flex items-center gap-1"
                                onClick={() => removeFileContext(file.name)}
                              >
                                <span className="text-muted-foreground">&lt;/&gt;</span>
                                <span className="text-muted-foreground font-normal truncate max-w-[150px]">
                                  {file.name}
                                </span>
                                <X size={12} className="text-muted-foreground" />
                              </button>
                            ))}
                          </div>
                          
                          {/* File Menu */}
                          {showFileMenu && (
                            <div className="absolute z-30 mt-1 mx-2 bg-popover border border-border rounded-md shadow-md max-h-40 overflow-y-auto">
                              <div className="p-2 text-xs font-medium text-muted-foreground border-b border-border">
                                Select files to reference:
                              </div>
                              {files.filter(f => f.type === 'file' && f.content).map((file) => (
                                <button
                                  key={file.name}
                                  type="button"
                                  onClick={() => addFileToInput(file)}
                                  className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                                >
                                  <AtSign size={14} className="text-muted-foreground" />
                                  {file.name}
                                </button>
                              ))}
                              {files.filter(f => f.type === 'file' && f.content).length === 0 && (
                                <div className="p-3 text-sm text-muted-foreground">No files available</div>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <textarea
                          ref={inputRef}
                          placeholder="Edit open file and selection"
                          className="w-full text-foreground border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-muted-foreground bg-transparent resize-none overflow-hidden min-h-[40px] max-h-[200px] px-3 py-2 outline-none"
                          rows={1}
                          value={input}
                          onChange={handleInputChange}
                          onKeyDown={handleInputKeyDown}
                          disabled={isLoading}
                        />
                        
                        <div className="pb-2">
                          <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                className="h-7 px-2 text-sm flex items-center gap-1 rounded-full bg-muted text-foreground hover:bg-muted/80"
                                onClick={() => setMode(mode === 'manual' ? 'auto' : 'manual')}
                              >
                                <Hand size={12} className="text-muted-foreground" />
                                <span className="capitalize">{mode}</span>
                                <ChevronDown size={12} className="text-muted-foreground opacity-60" />
                              </button>
                              
                              {/* Model Selection */}
                              <div className="relative">
                                <button
                                  type="button"
                                  className="h-7 px-2 text-sm flex items-center gap-1 rounded-md bg-transparent text-muted-foreground/60 hover:bg-muted/80"
                                  onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                                >
                                  <span>{AI_MODELS[provider][model as keyof typeof AI_MODELS[typeof provider]]}</span>
                                  <ChevronDown size={12} className="text-muted-foreground opacity-60" />
                                </button>
                                
                                {isModelMenuOpen && (
                                  <div className={`absolute left-0 bg-popover border border-border rounded-md shadow-md min-w-48 z-50 ${
                                    messages.length === 0 ? 'top-full mt-1' : 'bottom-full mb-1'
                                  }`}>
                                    <div className="p-2">
                                      <div className="text-xs font-medium text-muted-foreground mb-2">OpenAI</div>
                                      {Object.entries(AI_MODELS.openai).map(([key, label]) => (
                                        <button
                                          key={key}
                                          type="button"
                                          onClick={() => {
                                            handleProviderChange('openai');
                                            setModel(key);
                                          }}
                                          className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-muted ${
                                            provider === 'openai' && model === key ? 'bg-muted' : ''
                                          }`}
                                        >
                                          {label}
                                        </button>
                                      ))}
                                      
                                      <div className="text-xs font-medium text-muted-foreground mt-3 mb-2">Anthropic</div>
                                      {Object.entries(AI_MODELS.anthropic).map(([key, label]) => (
                                        <button
                                          key={key}
                                          type="button"
                                          onClick={() => {
                                            handleProviderChange('anthropic');
                                            setModel(key);
                                          }}
                                          className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-muted ${
                                            provider === 'anthropic' && model === key ? 'bg-muted' : ''
                                          }`}
                                        >
                                          {label}
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                className="size-7 h-7 w-7 rounded-full transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                              >
                                <CheckSquare size={14} />
                              </button>
                              <div className="h-8 w-8 flex items-center justify-center">
                                <button
                                  type="submit"
                                  className={`size-7 rounded-full h-7 w-7 ${
                                    input.trim() && !isLoading
                                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 opacity-100' 
                                      : 'bg-primary/10 text-primary-foreground opacity-10'
                                  }`}
                                  disabled={!input.trim() || isLoading}
                                >
                                  <Send size={16} className="transform rotate-45" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Messages exist - Scrollable messages with sticky input at bottom */
          <div className="flex flex-col h-full">
            {/* Messages Area */}
            <div className="flex-1 min-h-0">
              <div className="relative h-full overflow-hidden">
                <div className="size-full rounded-[inherit] overflow-y-auto">
                  <div className="p-3 pt-1">
                    <div className="mb-3 space-y-3">
                      {messages.map((message) => (
                        <div key={message.id} className="text-sm">
                          <div className="font-medium text-xs uppercase text-muted-foreground mb-1">
                            {message.role === 'user' ? 'You' : 'Assistant'}
                          </div>
                          <div 
                            className="text-foreground"
                            dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                          />
                          
                          {/* Show tool calls/file operations */}
                          {message.toolInvocations && message.toolInvocations.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.toolInvocations.map((toolInvocation, index) => (
                                <div key={index} className="text-xs bg-muted/50 rounded px-2 py-1 border-l-2 border-primary/30">
                                  {toolInvocation.state === 'call' && (
                                    <div className="text-muted-foreground">
                                      🔧 Calling {toolInvocation.toolName}...
                                    </div>
                                  )}
                                  {toolInvocation.state === 'result' && (
                                    <div>
                                      <div className="text-primary font-medium">
                                        {toolInvocation.toolName === 'createFile' && '📝 Created file'}
                                        {toolInvocation.toolName === 'updateFile' && '✏️ Updated file'}
                                        {toolInvocation.toolName === 'deleteFile' && '🗑️ Deleted file'}
                                        {toolInvocation.toolName === 'readFile' && '📖 Read file'}
                                        {toolInvocation.toolName === 'listFiles' && '📁 Listed files'}
                                      </div>
                                      {toolInvocation.result.success && toolInvocation.result.message && (
                                        <div className="text-muted-foreground">{toolInvocation.result.message}</div>
                                      )}
                                      {!toolInvocation.result.success && toolInvocation.result.error && (
                                        <div className="text-red-500">Error: {toolInvocation.result.error}</div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                      {isLoading && (
                        <div className="text-sm">
                          <div className="font-medium text-xs uppercase text-muted-foreground mb-1">Assistant</div>
                          <div className="text-muted-foreground">Thinking...</div>
                        </div>
                      )}
                      
                      {isUpdatingFiles && (
                        <div className="text-sm">
                          <div className="font-medium text-xs uppercase text-muted-foreground mb-1">System</div>
                          <div className="text-primary">🔄 Updating files...</div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Input Area */}
            <div className="flex-shrink-0 p-3 pt-0">
              <div className="border rounded-lg opacity-100">
                <div className="bg-muted/40 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-150">
                  <form onSubmit={handleSubmit} className="flex flex-col">
                    <div className="pt-2">
                      {/* Queued Messages Display */}
                      {queuedMessages.length > 0 && (
                        <div className="mb-2 mx-2">
                          <div className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-2">
                            <span>Inspection Queue ({queuedMessages.length})</span>
                            {isProcessingQueue && <span className="text-primary">Processing...</span>}
                          </div>
                          <div className="space-y-1 max-h-24 overflow-y-auto">
                            {queuedMessages.map((msg, index) => (
                              <div key={msg.id} className={`text-xs p-2 bg-muted/50 border border-border rounded flex justify-between items-start ${
                                currentlyProcessing === msg.id ? 'border-primary bg-primary/10' : ''
                              }`}>
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium text-foreground mb-1 truncate">
                                    {index + 1}. {msg.element}
                                  </div>
                                  <div className="text-muted-foreground line-clamp-1">
                                    {msg.message}
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => onClearQueuedMessage?.(msg.id)}
                                  disabled={isProcessingQueue}
                                  className="ml-2 text-muted-foreground hover:text-foreground disabled:opacity-50 flex-shrink-0"
                                >
                                  <X size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-1 px-2">
                        <button 
                          type="button"
                          className="h-7 rounded-md px-2 text-sm border bg-background hover:bg-accent flex items-center gap-1"
                          onClick={() => setShowFileMenu(!showFileMenu)}
                        >
                          <span className="text-muted-foreground">@</span>
                        </button>
                        
                        {/* File Context Display */}
                        {fileContext.map((file) => (
                          <button 
                            key={file.name}
                            type="button"
                            className="h-7 rounded-md px-2 text-sm border bg-background hover:bg-accent flex items-center gap-1"
                            onClick={() => removeFileContext(file.name)}
                          >
                            <span className="text-muted-foreground">&lt;/&gt;</span>
                            <span className="text-muted-foreground font-normal truncate max-w-[150px]">
                              {file.name}
                            </span>
                            <X size={12} className="text-muted-foreground" />
                          </button>
                        ))}
                      </div>
                      
                      {/* File Menu */}
                      {showFileMenu && (
                        <div className="absolute z-30 bottom-full mb-1 mx-2 bg-popover border border-border rounded-md shadow-md max-h-40 overflow-y-auto">
                          <div className="p-2 text-xs font-medium text-muted-foreground border-b border-border">
                            Select files to reference:
                          </div>
                          {files.filter(f => f.type === 'file' && f.content).map((file) => (
                            <button
                              key={file.name}
                              type="button"
                              onClick={() => addFileToInput(file)}
                              className="w-full px-3 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                            >
                              <AtSign size={14} className="text-muted-foreground" />
                              {file.name}
                            </button>
                          ))}
                          {files.filter(f => f.type === 'file' && f.content).length === 0 && (
                            <div className="p-3 text-sm text-muted-foreground">No files available</div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <textarea
                      ref={inputRef}
                      placeholder="Edit open file and selection"
                      className="w-full text-foreground border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-muted-foreground bg-transparent resize-none overflow-hidden min-h-[40px] max-h-[200px] px-3 py-2 outline-none"
                      rows={1}
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleInputKeyDown}
                      disabled={isLoading}
                    />
                    
                    <div className="pb-2">
                      <div className="flex items-center justify-between px-2">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className="h-7 px-2 text-sm flex items-center gap-1 rounded-full bg-muted text-foreground hover:bg-muted/80"
                            onClick={() => setMode(mode === 'manual' ? 'auto' : 'manual')}
                          >
                            <Hand size={12} className="text-muted-foreground" />
                            <span className="capitalize">{mode}</span>
                            <ChevronDown size={12} className="text-muted-foreground opacity-60" />
                          </button>
                          
                          {/* Model Selection */}
                          <div className="relative">
                            <button
                              type="button"
                              className="h-7 px-2 text-sm flex items-center gap-1 rounded-md bg-transparent text-muted-foreground/60 hover:bg-muted/80"
                              onClick={() => setIsModelMenuOpen(!isModelMenuOpen)}
                            >
                              <span>{AI_MODELS[provider][model as keyof typeof AI_MODELS[typeof provider]]}</span>
                              <ChevronDown size={12} className="text-muted-foreground opacity-60" />
                            </button>
                            
                            {isModelMenuOpen && (
                              <div className={`absolute left-0 bg-popover border border-border rounded-md shadow-md min-w-48 z-50 ${
                                messages.length === 0 ? 'top-full mt-1' : 'bottom-full mb-1'
                              }`}>
                                <div className="p-2">
                                  <div className="text-xs font-medium text-muted-foreground mb-2">OpenAI</div>
                                  {Object.entries(AI_MODELS.openai).map(([key, label]) => (
                                    <button
                                      key={key}
                                      type="button"
                                      onClick={() => {
                                        handleProviderChange('openai');
                                        setModel(key);
                                      }}
                                      className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-muted ${
                                        provider === 'openai' && model === key ? 'bg-muted' : ''
                                      }`}
                                    >
                                      {label}
                                    </button>
                                  ))}
                                  
                                  <div className="text-xs font-medium text-muted-foreground mt-3 mb-2">Anthropic</div>
                                  {Object.entries(AI_MODELS.anthropic).map(([key, label]) => (
                                    <button
                                      key={key}
                                      type="button"
                                      onClick={() => {
                                        handleProviderChange('anthropic');
                                        setModel(key);
                                      }}
                                      className={`w-full text-left px-2 py-1 text-sm rounded hover:bg-muted ${
                                        provider === 'anthropic' && model === key ? 'bg-muted' : ''
                                      }`}
                                    >
                                      {label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            className="size-7 h-7 w-7 rounded-full transition-all duration-150 text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          >
                            <CheckSquare size={14} />
                          </button>
                          <div className="h-8 w-8 flex items-center justify-center">
                            <button
                              type="submit"
                              className={`size-7 rounded-full h-7 w-7 ${
                                input.trim() && !isLoading
                                  ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 opacity-100' 
                                  : 'bg-primary/10 text-primary-foreground opacity-10'
                              }`}
                              disabled={!input.trim() || isLoading}
                            >
                              <Send size={16} className="transform rotate-45" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Past Chats */}
      <div className="flex-shrink-0 p-3">
        <div className="mt-auto">
          <div className="px-2 py-1 text-muted-foreground">Past chats</div>
          <div>
            <button className="w-full px-2 py-1 h-auto flex justify-between items-center hover:bg-muted rounded text-left">
              <span className="text-foreground font-normal">Import color variables</span>
              <span className="text-xs text-muted-foreground">2d ago</span>
            </button>
            <button className="w-full px-2 py-1 h-auto flex justify-between items-center hover:bg-muted rounded text-left">
              <span className="text-foreground font-normal">Refactor importer</span>
              <span className="text-xs text-muted-foreground">3d ago</span>
            </button>
            <button className="w-full px-2 py-1 h-auto flex justify-between items-center hover:bg-muted rounded text-left">
              <span className="text-foreground font-normal">Color import Figma plug-in</span>
              <span className="text-xs text-muted-foreground">4d ago</span>
            </button>
            <button className="w-full px-2 py-1 h-auto flex items-center text-muted-foreground justify-start hover:bg-muted rounded text-left">
              <span className="text-muted-foreground font-normal">See all history</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}