'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Cloud, RefreshCw, MoreHorizontal, Hand, ChevronDown, X, AtSign, ArrowUp } from 'lucide-react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage, type ChatStatus } from 'ai';
import { FileItem, saveFile as saveFileApi, deleteFile as deleteFileApi, isLocalFolderMode } from '@/lib/fileApi';
import { AI_MODELS } from '@/lib/chatApi';

interface ChatPanelProps {
  files: FileItem[];
  onFileChange?: () => void; // Callback to refresh file list when AI makes changes
  onForceRefreshFile?: (fileName: string) => void; // Callback to force refresh specific file
  queuedMessages?: Array<{
    id: string;
    fileName: string;
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

export function ChatPanel({ files, onFileChange, onForceRefreshFile, queuedMessages = [], onClearQueuedMessage }: ChatPanelProps) {
  const [mode, setMode] = useState<'manual' | 'auto'>('manual');
  const [provider, setProvider] = useState<'openai' | 'anthropic' | 'lmstudio'>('openai');
  const [model, setModel] = useState('gpt-4o');
  const [fileContext, setFileContext] = useState<FileReference[]>([]);
  const [isModelMenuOpen, setIsModelMenuOpen] = useState(false);
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [isUpdatingFiles, setIsUpdatingFiles] = useState(false);
  const [isProcessingQueue, setIsProcessingQueue] = useState(false);
  const [currentlyProcessing, setCurrentlyProcessing] = useState<string | null>(null);
  const [modelButtonPosition, setModelButtonPosition] = useState<{ top: number; left: number; width: number } | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const modelButtonRef1 = useRef<HTMLButtonElement>(null);
  const modelButtonRef2 = useRef<HTMLButtonElement>(null);

  const [input, setInput] = useState('');
  const [openaiReasoningEffort, setOpenaiReasoningEffort] = useState<'default' | 'low' | 'medium' | 'high'>('default');
  const [showLmstudioModal, setShowLmstudioModal] = useState(false);
  const [lmstudioBaseURL, setLmstudioBaseURL] = useState('http://localhost:1234/v1');
  const [lmstudioModelId, setLmstudioModelId] = useState('');

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
    }),
    onToolCall: async ({ toolCall }) => {
      // Detailed tool call logging
      console.log('🔧 [Frontend] Tool call initiated:', {
        toolName: toolCall.toolName,
        toolCallId: toolCall.toolCallId,
        input: (toolCall as unknown as { input?: unknown }).input,
        timestamp: new Date().toISOString()
      });
    },
    onFinish: async ({ message }) => {
      console.log('✅ [Frontend] Chat message finished:', {
        messageId: message.id,
        role: message.role,
        partsCount: Array.isArray((message as UIMessage).parts)
          ? ((message as UIMessage).parts as unknown[]).length
          : 0,
        timestamp: new Date().toISOString()
      });
      
      // Detect tool outputs (v5 typed tool parts)
      const parts: unknown[] = ((message as UIMessage).parts ?? []) as unknown[];

      const isToolPart = (p: unknown): p is { type: string; state?: string; output?: unknown; input?: unknown } => {
        if (!p || typeof p !== 'object') return false;
        const r = p as Record<string, unknown>;
        return typeof r.type === 'string' && r.type.startsWith('tool-');
      };

      const toolOutputParts = parts.filter(isToolPart).filter((p) => p.state === 'output-available');

      if (toolOutputParts.length > 0) {
        setIsUpdatingFiles(true);
        console.log('📁 [Frontend] Tool outputs detected:', toolOutputParts.length);

        // Determine modified files from tool outputs
        const modifiedFiles = new Set<string>();
        const getCandidateFileName = (part: { output?: unknown; input?: unknown }): string | undefined => {
          const output = part.output as Record<string, unknown> | undefined;
          const input = part.input as Record<string, unknown> | undefined;
          const fromOutput = typeof output?.fileName === 'string' ? (output.fileName as string) : undefined;
          const fromInput = typeof input?.fileName === 'string' ? (input.fileName as string) : undefined;
          return fromOutput || fromInput;
        };

        for (const part of toolOutputParts) {
          const candidate = getCandidateFileName(part);
          if (candidate) {
            modifiedFiles.add(candidate);
            console.log('📝 [Frontend] Detected modified file:', candidate);
          }
        }

        // If in local-folder mode, mirror tool changes to the connected local folder
        if (isLocalFolderMode()) {
          try {
            for (const part of toolOutputParts) {
              const p = part as { type: string; output?: Record<string, unknown>; input?: Record<string, unknown> };
              const opType = p.type || '';
              const fileName = (typeof p.output?.fileName === 'string' ? p.output?.fileName : p.input?.fileName) as string | undefined;
              const content = (typeof p.output?.content === 'string' ? (p.output?.content as string) : undefined) as string | undefined;
              if (!fileName) continue;
              if (opType === 'tool-createFile' || opType === 'tool-updateFile' || opType === 'tool-readFile') {
                if (typeof content === 'string') {
                  await saveFileApi(fileName, content);
                }
              }
              if (opType === 'tool-deleteFile') {
                await deleteFileApi(fileName);
              }
            }
          } catch (mirrorError) {
            console.error('❌ [Frontend] Failed mirroring tool changes to local folder:', mirrorError);
          }
        }

        // Force refresh specific files immediately for instant updates
        if (onForceRefreshFile && modifiedFiles.size > 0) {
          console.log('⚡ [Frontend] Force refreshing modified files...');
          setTimeout(async () => {
            for (const fileName of modifiedFiles) {
              try {
                await onForceRefreshFile(fileName);
              } catch (error) {
                console.error('❌ [Frontend] Failed to force refresh file:', fileName, error);
              }
            }
          }, 100);
        }

        // Also do a general refresh with retry logic for overall consistency
        if (onFileChange) {
          const attemptRefresh = async (attempt = 1, maxAttempts = 3) => {
            try {
              console.log(`📡 [Frontend] General file refresh attempt ${attempt}/${maxAttempts}`);
              await onFileChange();
              console.log('✨ [Frontend] General file refresh completed successfully');
              setIsUpdatingFiles(false);
            } catch (error) {
              console.error(`❌ [Frontend] General file refresh attempt ${attempt} failed:`, error);
              if (attempt < maxAttempts) {
                console.log(`⏳ [Frontend] Retrying general file refresh in 500ms...`);
                setTimeout(() => attemptRefresh(attempt + 1, maxAttempts), 500);
              } else {
                console.error('❌ [Frontend] All general file refresh attempts failed');
                setIsUpdatingFiles(false);
              }
            }
          };
          // Small delay to ensure backend operations complete
          setTimeout(() => attemptRefresh(), 300);
        } else {
          setIsUpdatingFiles(false);
        }
      }
    },
    onError: (error) => {
      console.error('❌ [Frontend] Chat error:', {
        error: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    },
  });

  const isLoading = (status as ChatStatus) === 'submitted' || (status as ChatStatus) === 'streaming';

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Global error handling for silent failures
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('🚨 [Frontend] Unhandled promise rejection:', {
        reason: event.reason,
        promise: event.promise,
        timestamp: new Date().toISOString()
      });
      
      // If this is related to chat/tools, log extra context
      if (isLoading) {
        console.error('🚨 [Frontend] Unhandled rejection occurred during chat loading!', {
          model,
          provider,
          messageCount: messages.length,
          hasInput: !!input.trim()
        });
      }
    };

    const handleError = (event: ErrorEvent) => {
      console.error('🚨 [Frontend] Global error:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: new Date().toISOString()
      });
    };

    // Add global error listeners
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
      window.removeEventListener('error', handleError);
    };
  }, [isLoading, model, provider, messages.length, input]);

  // Handle click outside and escape key for model menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isButton1 = modelButtonRef1.current && modelButtonRef1.current.contains(event.target as Node);
      const isButton2 = modelButtonRef2.current && modelButtonRef2.current.contains(event.target as Node);
      const dropdown = document.getElementById('model-dropdown');
      const isDropdown = dropdown && dropdown.contains(event.target as Node);
      
      if (!isButton1 && !isButton2 && !isDropdown) {
        setIsModelMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsModelMenuOpen(false);
      }
    };

    if (isModelMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isModelMenuOpen]);

  // Handle model menu toggle
  const handleModelMenuToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    
    if (!isModelMenuOpen) {
      // Calculate position directly from the clicked button
      const rect = button.getBoundingClientRect();
      setModelButtonPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
    setIsModelMenuOpen(!isModelMenuOpen);
  };

  // Handle @ file references and Enter key
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === '@') {
      setCursorPosition(e.currentTarget.selectionStart);
      setShowFileMenu(true);
    } else if (e.key === 'Escape') {
      setShowFileMenu(false);
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        const form = e.currentTarget.closest('form');
        if (form) {
          const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
          form.dispatchEvent(submitEvent);
        }
      }
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
      const formattedMessage = `[Element Inspector]\nFile: ${queuedMessage.fileName}\nElement: ${queuedMessage.element}\n\n${queuedMessage.message}`;
      
      // Send the message
      await sendMessage(
        { parts: [{ type: 'text', text: formattedMessage }] as Array<{ type: 'text'; text: string }> },
        { body: { 
            model, 
            provider, 
            fileContext, 
            localMode: isLocalFolderMode(),
            openaiOptions: provider === 'openai' && openaiReasoningEffort !== 'default' ? { reasoningEffort: openaiReasoningEffort } : undefined,
            lmstudioOptions: provider === 'lmstudio' ? { baseURL: lmstudioBaseURL, modelId: lmstudioModelId } : undefined,
          } as Record<string, unknown> }
      );
      
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
    
    console.log('📤 [Frontend] Submit triggered:', {
      hasInput: !!input.trim(),
      inputLength: input.length,
      queuedMessagesCount: queuedMessages.length,
      isLoading,
      model,
      provider,
      fileContextCount: fileContext.length,
      timestamp: new Date().toISOString()
    });
    
    // If there are queued messages, process them first
    if (queuedMessages.length > 0) {
      console.log('⏳ [Frontend] Processing queued messages first...');
      await processQueuedMessages();
    }
    
    // Then send the regular input if there's any
    if (input.trim()) {
      console.log('📨 [Frontend] Sending user message:', {
        content: input.substring(0, 200) + (input.length > 200 ? '...' : ''),
        fullLength: input.length,
        model,
        provider,
        fileContext: fileContext.map(f => ({ name: f.name, contentLength: f.content.length }))
      });
      await sendMessage(
        { text: input },
        { body: { 
            model, 
            provider, 
            fileContext, 
            localMode: isLocalFolderMode(),
            openaiOptions: provider === 'openai' && openaiReasoningEffort !== 'default' ? { reasoningEffort: openaiReasoningEffort } : undefined,
            lmstudioOptions: provider === 'lmstudio' ? { baseURL: lmstudioBaseURL, modelId: lmstudioModelId } : undefined,
          } as Record<string, unknown> }
      );
      setInput('');
    } else {
      console.log('⚠️ [Frontend] No input to send');
    }
  };

  const handleProviderChange = (newProvider: 'openai' | 'anthropic' | 'lmstudio') => {
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

  const getMessageHtml = (message: UIMessage) => {
    const parts: Array<unknown> = Array.isArray(message?.parts) ? (message.parts as unknown[]) : [];
    const text = parts
      .filter((p): p is { type: 'text'; text: string } =>
        !!p && typeof (p as Record<string, unknown>).type === 'string' &&
        (p as Record<string, unknown>).type === 'text' &&
        typeof (p as Record<string, unknown>).text === 'string')
      .map((p) => (p as { text: string }).text)
      .join('\n\n');
    return formatMessage(text);
  };

  // Portal-based dropdown component
  const ModelDropdown = () => {
    if (!isModelMenuOpen || !modelButtonPosition) return null;

    const dropdown = (
      <div
        id="model-dropdown"
        className="fixed bg-popover border border-border rounded-md shadow-lg min-w-48 z-[9999]"
        style={{
          top: modelButtonPosition.top + 4,
          left: modelButtonPosition.left,
          minWidth: Math.max(modelButtonPosition.width, 192)
        }}
      >
        <div className="p-2">
          <div className="text-xs font-medium text-muted-foreground mb-2 text-right">OpenAI</div>
          {Object.entries(AI_MODELS.openai).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                handleProviderChange('openai');
                setModel(key);
              }}
              className={`w-full text-right px-2 py-1 text-sm rounded hover:bg-muted ${
                provider === 'openai' && model === key ? 'bg-muted' : ''
              }`}
            >
              {label}
            </button>
          ))}
          
          <div className="text-xs font-medium text-muted-foreground mt-3 mb-2 text-right">Anthropic</div>
          {Object.entries(AI_MODELS.anthropic).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                handleProviderChange('anthropic');
                setModel(key);
              }}
              className={`w-full text-right px-2 py-1 text-sm rounded hover:bg-muted ${
                provider === 'anthropic' && model === key ? 'bg-muted' : ''
              }`}
            >
              {label}
            </button>
          ))}

          <div className="text-xs font-medium text-muted-foreground mt-3 mb-2 text-right">Local models</div>
          {Object.entries(AI_MODELS.lmstudio).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setShowLmstudioModal(true);
                setIsModelMenuOpen(false);
              }}
              className={`w-full text-right px-2 py-1 text-sm rounded hover:bg-muted ${
                provider === 'lmstudio' && model === key ? 'bg-muted' : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );

    return typeof document !== 'undefined' ? createPortal(dropdown, document.body) : null;
  };

  const LmstudioModal = () => {
    if (!showLmstudioModal) return null;
    const modal = (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50">
        <div style={{ maxWidth: '420px' }} className="bg-popover border border-border rounded-md shadow-lg w-full p-4">
          <div className="text-sm font-medium mb-3">Connect to LM Studio</div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Server URL</label>
              <input
                type="text"
                value={lmstudioBaseURL}
                onChange={(e) => setLmstudioBaseURL(e.target.value)}
                placeholder="http://localhost:1234/v1"
                className="w-full h-8 px-2 rounded border bg-background"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Model ID</label>
              <input
                type="text"
                value={lmstudioModelId}
                onChange={(e) => setLmstudioModelId(e.target.value)}
                placeholder="e.g. llama-3.2-1b"
                className="w-full h-8 px-2 rounded border bg-background"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              className="h-8 px-3 text-sm rounded border bg-background hover:bg-muted"
              onClick={() => setShowLmstudioModal(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="h-8 px-3 text-sm rounded bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => {
                if (!lmstudioBaseURL || !lmstudioModelId) return;
                handleProviderChange('lmstudio');
                setModel('custom');
                setShowLmstudioModal(false);
              }}
            >
              Save
            </button>
          </div>
          <div className="text-[11px] text-muted-foreground mt-3">
            LM Studio exposes an OpenAI-compatible API. Start the local server in LM Studio, then provide its URL and the downloaded model id.
          </div>
        </div>
      </div>
    );
    return typeof document !== 'undefined' ? createPortal(modal, document.body) : null;
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
                          onChange={(e) => setInput(e.target.value)}
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
                              <button
                                ref={modelButtonRef1}
                                type="button"
                                className="h-7 px-2 text-sm flex items-center gap-1 rounded-md bg-transparent text-muted-foreground/60 hover:bg-muted/80"
                                onClick={handleModelMenuToggle}
                              >
                                <span>
                                  {provider === 'lmstudio' && lmstudioModelId
                                    ? `Local: ${lmstudioModelId}`
                                    : AI_MODELS[provider][model as keyof typeof AI_MODELS[typeof provider]]}
                                </span>
                                <ChevronDown size={12} className="text-muted-foreground opacity-60" />
                              </button>
                            </div>
                            <div className="flex items-center">
                              <button
                                type="submit"
                                className={`size-7 rounded-full h-7 w-7 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-150 flex items-center justify-center ${
                                  isLoading ? 'opacity-50' : 'opacity-100'
                                }`}
                                disabled={isLoading}
                              >
                                <ArrowUp size={16} />
                              </button>
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
                            dangerouslySetInnerHTML={{ __html: getMessageHtml(message) }}
                          />
                          
                          {/* Show tool calls/file operations */}
                          {Array.isArray((message as UIMessage).parts) && (
                            <div className="mt-2 space-y-1">
                              {((message as UIMessage).parts as unknown[])
                                .filter((p): p is { type: string; state?: string; output?: unknown; errorText?: string } => {
                                  if (!p || typeof p !== 'object') return false;
                                  const r = p as Record<string, unknown>;
                                  return typeof r.type === 'string' && (r.type as string).startsWith('tool-');
                                })
                                .map((part, index: number) => (
                                  <div key={index} className="text-xs bg-muted/50 rounded px-2 py-1 border-l-2 border-primary/30">
                                    {part.state === 'input-streaming' && (
                                      <div className="text-muted-foreground">🔧 Preparing {part.type.replace('tool-', '')}...</div>
                                    )}
                                    {part.state === 'input-available' && (
                                      <div className="text-muted-foreground">🔧 Calling {part.type.replace('tool-', '')}...</div>
                                    )}
                                    {part.state === 'output-available' && (
                                      <div>
                                        <div className="text-primary font-medium">
                                          {part.type === 'tool-createFile' && '📝 Created file'}
                                          {part.type === 'tool-updateFile' && '✏️ Updated file'}
                                          {part.type === 'tool-deleteFile' && '🗑️ Deleted file'}
                                          {part.type === 'tool-readFile' && '📖 Read file'}
                                          {part.type === 'tool-listFiles' && '📁 Listed files'}
                                        </div>
                                        {typeof (part.output as Record<string, unknown> | undefined)?.message === 'string' && (
                                          <div className="text-muted-foreground">{(part.output as { message: string }).message}</div>
                                        )}
                                        {typeof (part.output as Record<string, unknown> | undefined)?.error === 'string' && (
                                          <div className="text-red-500">Error: {(part.output as { error: string }).error}</div>
                                        )}
                                      </div>
                                    )}
                                    {part.state === 'output-error' && (
                                      <div className="text-red-500">Error: {part.errorText || 'Tool execution failed'}</div>
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
                      onChange={(e) => setInput(e.target.value)}
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
                          <button
                            ref={modelButtonRef2}
                            type="button"
                            className="h-7 px-2 text-sm flex items-center gap-1 rounded-md bg-transparent text-muted-foreground/60 hover:bg-muted/80"
                            onClick={handleModelMenuToggle}
                          >
                            <span>
                              {provider === 'lmstudio' && lmstudioModelId
                                ? `Local: ${lmstudioModelId}`
                                : AI_MODELS[provider][model as keyof typeof AI_MODELS[typeof provider]]}
                            </span>
                            <ChevronDown size={12} className="text-muted-foreground opacity-60" />
                          </button>
                        </div>
                        <div className="flex items-center">
                          <button
                            type="submit"
                            className={`size-7 rounded-full h-7 w-7 bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 transition-all duration-150 flex items-center justify-center ${
                              isLoading ? 'opacity-50' : 'opacity-100'
                            }`}
                            disabled={isLoading}
                          >
                            <ArrowUp size={16} />
                          </button>
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

      {/* Portal-based Model Dropdown */}
      <ModelDropdown />
      <LmstudioModal />


    </div>
  );
}