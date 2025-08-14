'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { EditorArea } from '@/components/EditorArea';
import { ChatPanel } from '@/components/ChatPanel';
import { StatusBar } from '@/components/StatusBar';
import { MobileFileSelector } from '@/components/MobileFileSelector';
import { MobileBottomControls } from '@/components/MobileBottomControls';
import { MobileChatInput } from '@/components/MobileChatInput';
import { MobileChatSheet } from '@/components/MobileChatSheet';
import { FileItem, listFiles, saveFile, createFile, deleteFile, connectToLocalFolder, getFile } from '@/lib/fileApi';

export default function BabyCursor() {
  const [sidebarWidth] = useState(200);
  const [chatPanelWidth] = useState(320);
  const [activeFile, setActiveFile] = useState('');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [openFiles, setOpenFiles] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const [queuedMessages, setQueuedMessages] = useState<Array<{
    id: string;
    fileName: string;
    element: string;
    message: string;
    timestamp: number;
  }>>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isStreamingActive, setIsStreamingActive] = useState(false);
  const [streamingFiles, setStreamingFiles] = useState<Set<string>>(new Set());
  const streamingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Mobile-specific state
  const [mobileView, setMobileView] = useState<'code' | 'preview' | 'split' | 'design'>('code');
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileChatSheetOpen, setIsMobileChatSheetOpen] = useState(false);
  
  // Debounced save functionality
  const saveTimeoutRef = useRef<{ [fileName: string]: NodeJS.Timeout }>({});
  const pendingSaves = useRef<{ [fileName: string]: string }>({});
  const [unsavedFiles, setUnsavedFiles] = useState<Set<string>>(new Set());

  // Design mode state
  const [selectedElement, setSelectedElement] = useState<{
    element: HTMLElement | null;
    selector: string;
    styles: CSSStyleDeclaration | null;
  } | null>(null);
  const [isDesignMode, setIsDesignMode] = useState(false);

  const initializeSampleFiles = useCallback(async () => {
    try {
      const sampleFiles = [
        {
          name: 'welcome.html',
          type: 'file' as const,
          content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Welcome to Baby Cursor</title>
    <style>
      body {
        font-family: system-ui, -apple-system, sans-serif;
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem;
        line-height: 1.6;
      }
      h1 { color: #333; }
      .feature { margin: 1rem 0; }
    </style>
</head>
<body>
    <h1>Welcome to Baby Cursor!</h1>
    <p>A powerful web-based IDE with AI assistance.</p>
    <div class="feature">✨ Edit this file to see changes in real-time</div>
    <div class="feature">🤖 Use the chat panel for AI coding help</div>
    <div class="feature">📁 Create new files and folders</div>
</body>
</html>`
        },
        {
          name: 'README.md',
          type: 'file' as const,
          content: `# Baby Cursor

A modern web-based IDE with AI assistance.

## Features

- 📝 Monaco Editor with syntax highlighting
- 🗂️ File system operations (create, edit, delete)
- 💬 AI chat with file context (@file references)
- 🎨 Live preview for HTML files
- 🌙 Dark theme

## Getting Started

1. Create new files using the "+" button
2. Edit files in the Monaco editor
3. Use @filename in chat to reference files
4. Choose between OpenAI and Claude models

Happy coding! 🚀`
        }
      ];

      for (const file of sampleFiles) {
        await createFile(file);
      }
      
      // Reload files after creating samples
      const fileList = await listFiles();
      setFiles(fileList);
      
      // Check if README.md exists, otherwise use welcome.html
      const readmeFile = fileList.find(f => f.name === 'README.md');
      if (readmeFile) {
        setActiveFile('README.md');
        // Load the file content if available
        if (readmeFile.content !== undefined) {
          setOpenFiles(prev => ({
            ...prev,
            'README.md': readmeFile.content!
          }));
        }
      } else {
        setActiveFile('welcome.html');
      }
    } catch (error) {
      console.error('Failed to initialize sample files:', error);
    }
  }, []);

  const loadFiles = useCallback(async () => {
    try {
      setIsLoading(true);
      const fileList = await listFiles();
      setFiles(fileList);
      
      // Initialize with sample files if workspace is empty
      if (fileList.length === 0) {
        await initializeSampleFiles();
      } else {
        // Check if README.md exists and open it automatically
        const readmeFile = fileList.find(f => f.name === 'README.md');
        if (readmeFile) {
          setActiveFile('README.md');
          // Load the file content if available
          if (readmeFile.content !== undefined) {
            setOpenFiles(prev => ({
              ...prev,
              'README.md': readmeFile.content!
            }));
          }
        } else {
          // If README.md doesn't exist, ensure no file is selected
          setActiveFile('');
        }
      }
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setIsLoading(false);
    }
  }, [initializeSampleFiles]);

  // Load files on component mount
  useEffect(() => {
    loadFiles();
  }, [loadFiles]);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle design mode toggle
  useEffect(() => {
    setIsDesignMode(mobileView === 'design');
  }, [mobileView]);

  const handleElementSelect = (element: {
    element: HTMLElement | null;
    selector: string;
    styles: CSSStyleDeclaration | null;
  } | null) => {
    setSelectedElement(element);
  };

  const handleStyleChange = (property: string, value: string) => {
    if (selectedElement?.element) {
      (selectedElement.element.style as unknown as Record<string, string>)[property] = value;
      // Update the selected element's styles
      setSelectedElement(prev => prev ? {
        ...prev,
        styles: window.getComputedStyle(selectedElement.element!)
      } : null);
    }
  };

  const handleFileSelect = async (fileName: string) => {
    setActiveFile(fileName);
    
    // Load file content if not already loaded
    if (!openFiles[fileName]) {
      const file = files.find(f => f.name === fileName);
      if (file && file.content !== undefined) {
        setOpenFiles(prev => ({
          ...prev,
          [fileName]: file.content!
        }));
      }
    }
    
    // On mobile, default to code view when opening a file
    if (isMobile) {
      setMobileView('code');
    }
  };

  const handleFileChange = async (fileName: string, content: string) => {
    setOpenFiles(prev => ({
      ...prev,
      [fileName]: content
    }));
    
    // Mark file as having unsaved changes
    setUnsavedFiles(prev => new Set(prev).add(fileName));
    
    // Store pending content
    pendingSaves.current[fileName] = content;
    
    // Clear existing timeout for this file
    if (saveTimeoutRef.current[fileName]) {
      clearTimeout(saveTimeoutRef.current[fileName]);
    }
    
    // Set new debounced save timeout (2 seconds)
    saveTimeoutRef.current[fileName] = setTimeout(async () => {
      const contentToSave = pendingSaves.current[fileName];
      if (contentToSave !== undefined) {
        console.log(`💾 [AutoSave] Saving ${fileName} after 2s delay`);
        try {
          await saveFile(fileName, contentToSave);
          delete pendingSaves.current[fileName];
          
          // Mark file as saved
          setUnsavedFiles(prev => {
            const newSet = new Set(prev);
            newSet.delete(fileName);
            return newSet;
          });
          
          console.log(`✅ [AutoSave] Successfully saved ${fileName}`);
        } catch (error) {
          console.error(`❌ [AutoSave] Failed to save ${fileName}:`, error);
        }
      }
    }, 2000); // 2 second debounce
  };

  // Manual save function for immediate saves (e.g., Ctrl+S)
  const handleManualSave = async (fileName: string) => {
    // Clear any pending auto-save
    if (saveTimeoutRef.current[fileName]) {
      clearTimeout(saveTimeoutRef.current[fileName]);
      delete saveTimeoutRef.current[fileName];
    }
    
    const content = openFiles[fileName];
    if (content !== undefined) {
      console.log(`💾 [ManualSave] Immediately saving ${fileName}`);
      try {
        await saveFile(fileName, content);
        delete pendingSaves.current[fileName];
        
        // Mark file as saved
        setUnsavedFiles(prev => {
          const newSet = new Set(prev);
          newSet.delete(fileName);
          return newSet;
        });
        
        console.log(`✅ [ManualSave] Successfully saved ${fileName}`);
      } catch (error) {
        console.error(`❌ [ManualSave] Failed to save ${fileName}:`, error);
      }
    }
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    const currentTimeouts = saveTimeoutRef.current;
    return () => {
      Object.values(currentTimeouts).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, []);

  const refreshFileContents = async () => {
    try {
      console.log('🔄 [Sync] Starting file content refresh...');
      
      // Get fresh file list
      const updatedFiles = await listFiles();
      setFiles(updatedFiles);
      
      console.log('📁 [Sync] Updated files list:', updatedFiles.length, 'files');
      
      // Update content of any currently open files using latest state
      setOpenFiles((prev) => {
        const openFileNames = Object.keys(prev);
        if (openFileNames.length === 0) return prev;
        
        let didChange = false;
        const nextOpenFiles = { ...prev };
        
        for (const fileName of openFileNames) {
          const updatedFile = updatedFiles.find(f => f.name === fileName);
          if (updatedFile && updatedFile.content !== undefined && nextOpenFiles[fileName] !== updatedFile.content) {
            console.log('📝 [Sync] File content changed:', fileName, {
              oldLength: nextOpenFiles[fileName]?.length || 0,
              newLength: updatedFile.content.length
            });
            nextOpenFiles[fileName] = updatedFile.content;
            didChange = true;
          }
        }
        
        return didChange ? nextOpenFiles : prev;
      });
    } catch (error) {
      console.error('❌ [Sync] Failed to refresh file contents:', error);
    }
  };

  // Force refresh specific file content with immediate update
  const forceRefreshFile = async (fileName: string) => {
    try {
      console.log('⚡ [Sync] Force refreshing file:', fileName);
      
      // Fetch only the specific file for efficiency
      const updated = await getFile(fileName);
      if (!updated || updated.content === undefined) {
        console.warn('⚠️ [Sync] File not found or has no content:', fileName);
        return;
      }
      
      // Update files list entry in place
      setFiles((prev) => {
        const idx = prev.findIndex(f => f.name === fileName);
        if (idx === -1) return prev;
        const next = prev.slice();
        next[idx] = { ...next[idx], content: updated.content } as FileItem;
        return next;
      });
      
      // Update open editor content if the file is open
      setOpenFiles((prev) => {
        if (!(fileName in prev)) return prev;
        if (prev[fileName] === updated.content) return prev;
        return { ...prev, [fileName]: updated.content! };
      });
      
      console.log('✅ [Sync] Force refresh completed for:', fileName);
    } catch (error) {
      console.error('❌ [Sync] Failed to force refresh file:', fileName, error);
    }
  };

  // Start live streaming mode with frequent file refresh
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const startStreamingMode = (fileName?: string) => {
    setIsStreamingActive(true);
    
    if (fileName) {
      setStreamingFiles(prev => new Set(prev).add(fileName));
    }
    
    // Clear any existing interval
    if (streamingIntervalRef.current) {
      clearInterval(streamingIntervalRef.current);
    }
    
    // Start polling for file updates every 500ms during streaming
    streamingIntervalRef.current = setInterval(async () => {
      await refreshFileContents();
    }, 500);
  };

  // Stop live streaming mode
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stopStreamingMode = (fileName?: string) => {
    if (fileName) {
      setStreamingFiles(prev => {
        const newSet = new Set(prev);
        newSet.delete(fileName);
        return newSet;
      });
      
      // If no more files are streaming, stop the interval
      if (streamingFiles.size <= 1) {
        setIsStreamingActive(false);
        if (streamingIntervalRef.current) {
          clearInterval(streamingIntervalRef.current);
          streamingIntervalRef.current = null;
        }
      }
    } else {
      // Stop all streaming
      setIsStreamingActive(false);
      setStreamingFiles(new Set());
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
        streamingIntervalRef.current = null;
      }
    }
    
    // Do a final refresh when streaming stops
    setTimeout(refreshFileContents, 100);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (streamingIntervalRef.current) {
        clearInterval(streamingIntervalRef.current);
      }
    };
  }, []);

  const handleAddQueuedMessage = (fileName: string, element: string, message: string) => {
    const newMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      fileName,
      element,
      message,
      timestamp: Date.now()
    };
    setQueuedMessages(prev => [...prev, newMessage]);
  };

  const handleFileClose = (fileName: string) => {
    setOpenFiles(prev => {
      const newOpenFiles = { ...prev };
      delete newOpenFiles[fileName];
      return newOpenFiles;
    });
    
    if (fileName === activeFile) {
      const remainingFiles = Object.keys(openFiles).filter(f => f !== fileName);
      setActiveFile(remainingFiles.length > 0 ? remainingFiles[0] : '');
    }
  };

  const handleCreateFile = async (name: string, type: 'file' | 'directory' = 'file') => {
    try {
      await createFile({ name, type, content: type === 'file' ? '' : undefined });
      await loadFiles();
      
      if (type === 'file') {
        setActiveFile(name);
        setOpenFiles(prev => ({ ...prev, [name]: '' }));
      }
    } catch (error) {
      console.error('Failed to create file:', error);
    }
  };

  const handleDeleteFile = async (fileName: string) => {
    try {
      await deleteFile(fileName);
      await loadFiles();
      
      // Close file if it was open
      if (openFiles[fileName]) {
        handleFileClose(fileName);
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  // Handle mobile chat message sending - integrates with existing chat system
  const handleMobileChatMessage = async (message: string, fileContext?: Array<{ name: string; content: string }>) => {
    // Create a simplified chat message that can be processed
    // We'll add this to the queued messages system for now
    const messageId = `mobile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Format the message with file context if provided
    let formattedMessage = message;
    if (fileContext && fileContext.length > 0) {
      const contextInfo = fileContext.map(f => `@${f.name}`).join(' ');
      formattedMessage = `${contextInfo}\n\n${message}`;
    }
    
    // Add to queued messages for processing
    const newMessage = {
      id: messageId,
      fileName: activeFile || 'mobile-chat',
      element: 'Mobile Chat',
      message: formattedMessage,
      timestamp: Date.now()
    };
    
    setQueuedMessages(prev => [...prev, newMessage]);
    
    console.log('Mobile chat message queued:', newMessage);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <div>Loading workspace...</div>
      </div>
    );
  }

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="flex flex-col h-dvh bg-background text-foreground pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] overflow-hidden">
        {/* Mobile File Selector at top */}
        <MobileFileSelector
          files={files}
          activeFile={activeFile}
          onFileSelect={handleFileSelect}
          onCreateFile={handleCreateFile}
        />

        {/* Main Editor Area */}
        <div className="flex-1 overflow-hidden relative">
          <EditorArea 
            openFiles={openFiles}
            activeFile={activeFile} 
            onFileChange={handleFileChange}
            onFileClose={handleFileClose}
            onFileSelect={handleFileSelect}
            isPreviewFullscreen={isPreviewFullscreen}
            onTogglePreviewFullscreen={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
            onAddQueuedMessage={(element: string, message: string) => handleAddQueuedMessage(activeFile, element, message)}
            streamingFiles={streamingFiles}
            unsavedFiles={unsavedFiles}
            onManualSave={handleManualSave}
            // Pass mobile view state
            forcedView={mobileView}
            hideTabs={true}
            hideViewControls={true}
            onElementSelect={handleElementSelect}
            onStyleChange={handleStyleChange}
          />
        </div>

        {/* Mobile Bottom Controls */}
        <MobileBottomControls
          activeView={mobileView}
          onViewChange={setMobileView}
        />

        {/* Mobile Chat Input */}
        <MobileChatInput
          onOpenSheet={() => setIsMobileChatSheetOpen(true)}
        />

        {/* Mobile Chat Sheet */}
        <MobileChatSheet
          isOpen={isMobileChatSheetOpen}
          onClose={() => setIsMobileChatSheetOpen(false)}
          files={files}
          onFileChange={refreshFileContents}
          onForceRefreshFile={forceRefreshFile}
          queuedMessages={queuedMessages}
          onClearQueuedMessage={(id) => {
            setQueuedMessages(prev => prev.filter(msg => msg.id !== id));
          }}
        />
      </div>
    );
  }

  // Desktop Layout (unchanged)
  return (
    <div className="flex flex-col h-dvh bg-background text-foreground pt-[env(safe-area-inset-top)] pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {!isPreviewFullscreen && (
          <div 
            className="bg-card flex flex-col h-full text-foreground relative transition-all duration-300 select-none border-r border-border"
            style={{ width: `${sidebarWidth}px` }}
          >
            <div className="absolute top-0 right-0 w-1 h-full cursor-col-resize z-10 hover:bg-primary/50 active:bg-primary transition-colors duration-150 ease-in-out"></div>
            <Sidebar 
              files={files} 
              activeFile={activeFile} 
              onFileSelect={handleFileSelect}
              onCreateFile={handleCreateFile}
              onDeleteFile={handleDeleteFile}
              mode={isDesignMode ? 'design' : 'files'}
              selectedElement={selectedElement}
            onStyleChange={handleStyleChange}
            onConnectLocal={async () => {
              try {
                const { label } = await connectToLocalFolder();
                console.log('✅ Connected local folder:', label);
                await loadFiles();
              } catch (e) {
                console.error('Failed to connect to local folder:', e);
              }
            }}
            />
          </div>
        )}

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <EditorArea 
            openFiles={openFiles}
            activeFile={activeFile} 
            onFileChange={handleFileChange}
            onFileClose={handleFileClose}
            onFileSelect={handleFileSelect}
            isPreviewFullscreen={isPreviewFullscreen}
            onTogglePreviewFullscreen={() => setIsPreviewFullscreen(!isPreviewFullscreen)}
            onAddQueuedMessage={(element: string, message: string) => handleAddQueuedMessage(activeFile, element, message)}
            streamingFiles={streamingFiles}
            unsavedFiles={unsavedFiles}
            onManualSave={handleManualSave}
            onElementSelect={handleElementSelect}
            onStyleChange={handleStyleChange}
          />
        </div>

        {/* Chat Panel */}
        {!isPreviewFullscreen && (
          <div className="flex h-full">
            <div 
              className="flex-shrink-0 border-l border-border first:border-l-0 transition-all duration-300"
              style={{ minWidth: `${chatPanelWidth}px`, width: `${chatPanelWidth}px`, opacity: 1 }}
            >
              <div className="relative w-full h-full">
                <div 
                  className="flex flex-col bg-card h-full transition-all duration-300 relative overflow-hidden border-l border-border"
                  style={{ width: `${chatPanelWidth}px` }}
                >
                  <div className="absolute top-0 left-0 w-1 h-full cursor-col-resize z-10 hover:bg-primary/50 active:bg-primary transition-colors duration-150 ease-in-out"></div>
                  <ChatPanel 
                    files={files} 
                    onFileChange={refreshFileContents}
                    onForceRefreshFile={forceRefreshFile}
                    queuedMessages={queuedMessages}
                    onClearQueuedMessage={(id) => {
                      setQueuedMessages(prev => prev.filter(msg => msg.id !== id));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <StatusBar />
    </div>
  );
}
