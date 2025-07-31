'use client';

import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { EditorArea } from '@/components/EditorArea';
import { ChatPanel } from '@/components/ChatPanel';
import { StatusBar } from '@/components/StatusBar';
import { FileItem, listFiles, saveFile, createFile, deleteFile, setWorkspaceMode, getWorkspaceInfo } from '@/lib/fileApi';
import { connectToLocalFolder, isFileSystemAccessSupported } from '@/lib/localFileApi';

export default function BabyCursor() {
  const [sidebarWidth] = useState(200);
  const [chatPanelWidth] = useState(320);
  const [activeFile, setActiveFile] = useState('');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [openFiles, setOpenFiles] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshingFiles, setIsRefreshingFiles] = useState(false);
  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState(false);
  const [queuedMessages, setQueuedMessages] = useState<Array<{
    id: string;
    element: string;
    message: string;
    timestamp: number;
  }>>([]);
  const [workspaceInfo, setWorkspaceInfo] = useState(getWorkspaceInfo());

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
      setActiveFile('welcome.html');
    } catch (error) {
      console.error('Failed to initialize sample files:', error);
    }
  }, []);

  const loadFiles = useCallback(async (isInitialLoad = false) => {
    try {
      if (isInitialLoad) {
        setIsLoading(true);
      } else {
        setIsRefreshingFiles(true);
      }
      
      const fileList = await listFiles();
      setFiles(fileList);
      
      // Initialize with sample files if workspace is empty
      if (fileList.length === 0) {
        await initializeSampleFiles();
      }
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      } else {
        setIsRefreshingFiles(false);
      }
    }
  }, [initializeSampleFiles]);

  // Load files on component mount
  useEffect(() => {
    loadFiles(true); // Initial load
  }, [loadFiles]);

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
  };

  const handleFileChange = async (fileName: string, content: string) => {
    setOpenFiles(prev => ({
      ...prev,
      [fileName]: content
    }));
    
    // Auto-save after a delay (debounced)
    // For now, save immediately
    try {
      await saveFile(fileName, content);
    } catch (error) {
      console.error('Failed to save file:', error);
    }
  };

  const refreshFileContents = async () => {
    try {
      // Get fresh file list
      const updatedFiles = await listFiles();
      setFiles(updatedFiles);
      
      // Update content of any currently open files that might have been modified by AI
      const openFileNames = Object.keys(openFiles);
      const updatedOpenFiles = { ...openFiles };
      
      for (const fileName of openFileNames) {
        const updatedFile = updatedFiles.find(f => f.name === fileName);
        if (updatedFile && updatedFile.content !== undefined) {
          updatedOpenFiles[fileName] = updatedFile.content;
        }
      }
      
      setOpenFiles(updatedOpenFiles);
    } catch (error) {
      console.error('Failed to refresh file contents:', error);
    }
  };

  const handleAddQueuedMessage = (element: string, message: string) => {
    const newMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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
      await loadFiles(false); // Not initial load
      
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
      await loadFiles(false); // Not initial load
      
      // Close file if it was open
      if (openFiles[fileName]) {
        handleFileClose(fileName);
      }
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  const handleConnectLocalFolder = async () => {
    if (!isFileSystemAccessSupported()) {
      alert('File System Access API is not supported in this browser. Please use a modern browser like Chrome or Edge.');
      return;
    }

    try {
      const workspace = await connectToLocalFolder();
      setWorkspaceMode('local');
      setWorkspaceInfo(getWorkspaceInfo());
      
      // Clear current files and load from local workspace
      setFiles([]);
      setOpenFiles({});
      setActiveFile('');
      
      await loadFiles(false); // Not initial load
      
      console.log(`Connected to local workspace: ${workspace.name}`);
    } catch (error) {
      console.error('Failed to connect to local folder:', error);
      if (error instanceof Error && error.message === 'User cancelled folder selection') {
        // User cancelled, no need to show error
        return;
      }
      alert('Failed to connect to local folder. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background text-foreground">
        <div>Loading workspace...</div>
      </div>
    );
  }

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
              onConnectLocalFolder={handleConnectLocalFolder}
              workspaceName={workspaceInfo.name}
              isLocalWorkspace={workspaceInfo.mode === 'local'}
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
            onAddQueuedMessage={handleAddQueuedMessage}
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
                    onFileChange={() => loadFiles(false)}
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
