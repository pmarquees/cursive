// File system API utilities
import {
  connectDirectory as connectLocalDirectory,
  disconnectDirectory as disconnectLocalDirectory,
  getConnectedDirectoryHandle,
  listAll as localListAll,
  writeFile as localWriteFile,
  createEntry as localCreateEntry,
  deleteEntry as localDeleteEntry,
  readFile as localReadFile,
  connectDirectory as localConnectDirectory,
  disconnectDirectory as localDisconnectDirectory,
  isFileSystemAccessSupported as localFsSupported,
} from '@/lib/localFs';

export interface FileItem {
  name: string;
  type: 'file' | 'directory';
  path: string;
  content?: string;
}

export interface CreateFileRequest {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  path?: string;
}

// We'll use isBlobStorageAvailable instead of isProductionEnvironment

// Check if Vercel Blob is available
const isBlobStorageAvailable = () => {
  return typeof window !== 'undefined' && window.location.hostname !== 'localhost';
};

// LocalStorage-based file system for production
const LOCAL_STORAGE_KEY = 'baby-cursor-files';

// Local folder mode toggle
let useLocalFolderMode = false;
let localFolderLabel = '';

export function enableLocalFolderMode(label?: string) {
  useLocalFolderMode = true;
  if (label) localFolderLabel = label;
}

export function disableLocalFolderMode() {
  useLocalFolderMode = false;
  localFolderLabel = '';
}

export function isLocalFolderMode(): boolean {
  return useLocalFolderMode;
}

export function getLocalFolderLabel(): string {
  return localFolderLabel || 'Local';
}

export async function connectToLocalFolder(): Promise<{ label: string }>{
  if (!localFsSupported()) {
    throw new Error('File System Access API not supported in this browser');
  }
  const { name } = await localConnectDirectory();
  enableLocalFolderMode(name);
  return { label: name };
}

export function disconnectLocalFolder(): void {
  disableLocalFolderMode();
  localDisconnectDirectory();
}

// Get files from localStorage
function getLocalStorageFiles(): Record<string, FileItem> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// Save files to localStorage
function setLocalStorageFiles(files: Record<string, FileItem>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(files));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

// Initialize with default files if empty
function initializeDefaultFiles() {
  const files = getLocalStorageFiles();
  if (Object.keys(files).length === 0) {
    const defaultFiles: Record<string, FileItem> = {
      'README.md': {
        name: 'README.md',
        type: 'file',
        path: 'README.md',
        content: `# Cursive, Baby Cursor's cousin

  A lightweight code editor and AI assistant for web development.

  ## Features

  - **Multi-file editing** with syntax highlighting
  - **Live preview** with responsive device simulation
  - **AI-powered assistance** for code generation and editing
  - **Real-time collaboration** with AI agents
  - **Design mode** for visual editing

  ## Getting Started

  After seeing your video and the Baby Cursor tweets I thought I'd give this a shot to learn how Cursor works and see how far I could get by myself :D 

  I had chat with yourself, on os.ryo.lu and you helped me write this Readme, after this bit go to the calculator.html, or generate a new thing, to check out the preview/inspector and all the other features

  ---
  yo ryo! 👋 

  i'm pedro marques, a designer with 20 years in the game. after our convo on ryOS about making cursor accessible to everyone through "vibe coding," i went ahead and rebuilt cursor from scratch - then added the features we discussed that could make the idea-to-reality gap close to zero.

  ## what i built

  core foundation:
  - 📝 monaco editor with syntax highlighting
  - 🗂️ full file system (create, edit, delete)
  - 💬 ai chat with file context (@file references)
  - 🎨 live preview
  - 🔄 side-by-side code/design mode - edit code and see visual changes in real-time
  - 🎛️ figma-style design panels - select any element in preview and tweak its props/styles visually
  - 🎯 contextualized ai prompts - press C and click any element in preview to send targeted prompts about that specific component

  the game-changers (Ryo gave me this idea on our chat so I implemented it too ):
  - 📱 mobile-first responsive preview - see mobile, tablet, and desktop views simultaneously (the feature we brainstormed!)


  this isn't just another code editor - it's what happens when you take cursor's vision of "anyone can make software" and actually build it for designers, product people, and anyone with ideas.

  the goal? make coding feel less like coding and more like creating 🔥

  ready to make cursor 100x better together?

  ---
  built with the belief that the best tools free minds to focus on what matters: turning ideas into reality

  ## Tips

  - Use the inspection mode in preview to analyze elements
  - Try the design mode for visual styling
  - Ask the AI assistant for help with coding tasks
  - Use split view for side-by-side coding and preview

  Happy coding! 🚀

  *built with the belief that he best tools free minds to focus on what matters: turning ideas into reality*`
      },
      'calculator.html': {
        name: 'calculator.html',
        type: 'file',
        path: 'calculator.html',
        content: `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Calculator</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .calculator {
              background: white;
              border-radius: 15px;
              padding: 20px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.2);
              width: 300px;
          }
          .display {
              width: 100%;
              height: 60px;
              border: none;
              background: #f8f9fa;
              border-radius: 8px;
              text-align: right;
              padding: 0 15px;
              font-size: 24px;
              margin-bottom: 15px;
              outline: none;
          }
          .buttons {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 10px;
          }
          button {
              height: 50px;
              border: none;
              border-radius: 8px;
              font-size: 18px;
              cursor: pointer;
              transition: background-color 0.2s;
          }
          .number, .decimal {
              background: #e9ecef;
          }
          .number:hover, .decimal:hover {
              background: #dee2e6;
          }
          .operator {
              background: #007bff;
              color: white;
          }
          .operator:hover {
              background: #0056b3;
          }
          .equals {
              background: #28a745;
              color: white;
          }
          .equals:hover {
              background: #1e7e34;
          }
          .clear {
              background: #dc3545;
              color: white;
          }
          .clear:hover {
              background: #c82333;
          }
      </style>
  </head>
  <body>
      <div class="calculator">
          <input type="text" class="display" id="display" readonly>
          <div class="buttons">
              <button class="clear" onclick="clearDisplay()">C</button>
              <button class="operator" onclick="appendToDisplay('/')">/</button>
              <button class="operator" onclick="appendToDisplay('*')">×</button>
              <button class="operator" onclick="deleteLast()">⌫</button>
              
              <button class="number" onclick="appendToDisplay('7')">7</button>
              <button class="number" onclick="appendToDisplay('8')">8</button>
              <button class="number" onclick="appendToDisplay('9')">9</button>
              <button class="operator" onclick="appendToDisplay('-')">-</button>
              
              <button class="number" onclick="appendToDisplay('4')">4</button>
              <button class="number" onclick="appendToDisplay('5')">5</button>
              <button class="number" onclick="appendToDisplay('6')">6</button>
              <button class="operator" onclick="appendToDisplay('+')">+</button>
              
              <button class="number" onclick="appendToDisplay('1')">1</button>
              <button class="number" onclick="appendToDisplay('2')">2</button>
              <button class="number" onclick="appendToDisplay('3')">3</button>
              <button class="equals" onclick="calculate()" rowspan="2">=</button>
              
              <button class="number" onclick="appendToDisplay('0')" colspan="2">0</button>
              <button class="decimal" onclick="appendToDisplay('.')">.</button>
          </div>
      </div>

      <script>
          let display = document.getElementById('display');
          
          function appendToDisplay(value) {
              display.value += value;
          }
          
          function clearDisplay() {
              display.value = '';
          }
          
          function deleteLast() {
              display.value = display.value.slice(0, -1);
          }
          
          function calculate() {
              try {
                  let result = eval(display.value.replace('×', '*'));
                  display.value = result;
              } catch (error) {
                  display.value = 'Error';
              }
          }
          
          // Keyboard support
          document.addEventListener('keydown', function(event) {
              if (event.key >= '0' && event.key <= '9') {
                  appendToDisplay(event.key);
              } else if (event.key === '.') {
                  appendToDisplay('.');
              } else if (event.key === '+' || event.key === '-') {
                  appendToDisplay(event.key);
              } else if (event.key === '*') {
                  appendToDisplay('*');
              } else if (event.key === '/') {
                  event.preventDefault();
                  appendToDisplay('/');
              } else if (event.key === 'Enter' || event.key === '=') {
                  calculate();
              } else if (event.key === 'Escape' || event.key === 'c' || event.key === 'C') {
                  clearDisplay();
              } else if (event.key === 'Backspace') {
                  deleteLast();
              }
          });
      </script>
  </body>
  </html>`
      }
    };
    setLocalStorageFiles(defaultFiles);
    return Object.values(defaultFiles);
  }
  return Object.values(files);
}

// List files and directories
export async function listFiles(path: string = ''): Promise<FileItem[]> {
  // Local folder mode via File System Access API
  if (useLocalFolderMode) {
    const dir = getConnectedDirectoryHandle();
    if (!dir) {
      throw new Error('Local folder not connected');
    }
    const items = await localListAll(dir);
    // Represent nested files using their relative path as the display name to avoid collisions
    return items.map((it) => ({
      name: it.path || it.name,
      type: it.type,
      path: it.path || it.name,
      content: it.content,
    }));
  }

  if (isBlobStorageAvailable()) {
    // Use Vercel Blob in production
    console.log('📂 [FileAPI] Attempting to list from blob storage:', {
      path,
      hostname: window.location.hostname
    });
    
    try {
      const response = await fetch(`/api/blob/list?path=${encodeURIComponent(path)}`);
      
      console.log('📡 [FileAPI] Blob list response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      
      if (!response.ok) {
        // Try to get more detailed error information
        let errorDetails = `HTTP ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorDetails = errorData.error || errorDetails;
          console.error('❌ [FileAPI] Blob list error details:', errorData);
        } catch {
          // Could not parse error response
        }
        throw new Error(`Failed to list files from blob storage: ${errorDetails}`);
      }
      
      const data = await response.json();
      console.log('📋 [FileAPI] Blob list data:', {
        fileCount: data.files?.length || 0,
        shouldInitialize: data.shouldInitialize
      });
      
      // If no files exist and should initialize, create default files
      if (data.shouldInitialize) {
        console.log('🚀 [FileAPI] Initializing default files...');
        const initResponse = await fetch('/api/blob/init', {
          method: 'POST',
        });
        if (initResponse.ok) {
          const initData = await initResponse.json();
          console.log('✅ [FileAPI] Default files initialized:', initData.files?.length || 0);
          return initData.files;
        } else {
          console.error('❌ [FileAPI] Failed to initialize default files');
        }
      }
      
      // Fetch content for each file
      console.log('📥 [FileAPI] Fetching content for files...');
      const filesWithContent = await Promise.all(
        data.files.map(async (file: FileItem) => {
          try {
            const contentResponse = await fetch(`/api/blob/get?path=${encodeURIComponent(file.path)}`);
            if (contentResponse.ok) {
              const contentData = await contentResponse.json();
              return { ...file, content: contentData.content };
            } else {
              console.warn(`❌ [FileAPI] Failed to load content for ${file.path}: ${contentResponse.status}`);
            }
            return file;
          } catch (error) {
            console.warn(`❌ [FileAPI] Error loading content for ${file.path}:`, error);
            return file;
          }
        })
      );
      
      console.log('✅ [FileAPI] Successfully listed files from blob storage:', filesWithContent.length);
      return filesWithContent;
    } catch (error) {
      console.error('❌ [FileAPI] Blob storage failed, falling back to localStorage:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        path
      });
      const localFiles = initializeDefaultFiles();
      console.log('✅ [FileAPI] Fallback to localStorage successful:', localFiles.length);
      return localFiles;
    }
  }
  
  try {
    const response = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
    if (!response.ok) {
      throw new Error('Failed to list files');
    }
    const data = await response.json();
    return data.files;
  } catch (error) {
    // Fallback to localStorage if server fails
    console.warn('Server API failed, using localStorage:', error);
    return initializeDefaultFiles();
  }
}

// Create file or directory
export async function createFile(request: CreateFileRequest): Promise<FileItem> {
  if (useLocalFolderMode) {
    const dir = getConnectedDirectoryHandle();
    if (!dir) throw new Error('Local folder not connected');
    const fullPath = request.path ? `${request.path}/${request.name}` : request.name;
    await localCreateEntry(dir, fullPath, request.type, request.content || '');
    return {
      name: fullPath,
      type: request.type,
      path: fullPath,
      content: request.type === 'file' ? (request.content || '') : undefined,
    };
  }

  if (isBlobStorageAvailable()) {
    // Use Vercel Blob in production
    try {
      const response = await fetch('/api/blob/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create file in blob storage');
      }
      
      const data = await response.json();
      return data.file;
    } catch (error) {
      console.warn('Blob storage failed, using localStorage:', error);
      const files = getLocalStorageFiles();
      const filePath = request.path ? `${request.path}/${request.name}` : request.name;
      
      const newFile: FileItem = {
        name: request.name,
        type: request.type,
        path: filePath,
        content: request.type === 'file' ? (request.content || '') : undefined,
      };
      
      files[filePath] = newFile;
      setLocalStorageFiles(files);
      return newFile;
    }
  }
  
  try {
    const response = await fetch('/api/files', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create file');
    }
    
    const data = await response.json();
    return data.file;
  } catch (error) {
    // Fallback to localStorage if server fails
    console.warn('Server API failed, using localStorage:', error);
    const files = getLocalStorageFiles();
    const filePath = request.path ? `${request.path}/${request.name}` : request.name;
    
    const newFile: FileItem = {
      name: request.name,
      type: request.type,
      path: filePath,
      content: request.type === 'file' ? (request.content || '') : undefined,
    };
    
    files[filePath] = newFile;
    setLocalStorageFiles(files);
    return newFile;
  }
}

// Save file content
export async function saveFile(path: string, content: string): Promise<void> {
  if (useLocalFolderMode) {
    const dir = getConnectedDirectoryHandle();
    if (!dir) throw new Error('Local folder not connected');
    await localWriteFile(dir, path, content);
    return;
  }

  if (isBlobStorageAvailable()) {
    // Use Vercel Blob in production
    console.log('💾 [FileAPI] Attempting to save to blob storage:', {
      path,
      contentLength: content.length,
      hostname: window.location.hostname
    });
    
    try {
      const response = await fetch(`/api/blob/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path, content }),
      });
      
      console.log('📡 [FileAPI] Blob save response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      
      if (!response.ok) {
        // Try to get more detailed error information
        let errorDetails = `HTTP ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          errorDetails = errorData.error || errorDetails;
          console.error('❌ [FileAPI] Blob save error details:', errorData);
        } catch {
          // Could not parse error response
        }
        throw new Error(`Failed to save file to blob storage: ${errorDetails}`);
      }
      
      console.log('✅ [FileAPI] Successfully saved to blob storage');
      return;
    } catch (error) {
      console.error('❌ [FileAPI] Blob storage failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        path,
        fallbackToLocalStorage: true
      });
      
      // Fallback to localStorage
      const files = getLocalStorageFiles();
      if (files[path]) {
        files[path].content = content;
        setLocalStorageFiles(files);
        console.log('✅ [FileAPI] Fallback to localStorage successful');
      } else {
        console.warn('⚠️ [FileAPI] File not found in localStorage, cannot update');
      }
      return;
    }
  }
  
  try {
    const response = await fetch(`/api/files/${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to save file');
    }
  } catch (error) {
    // Fallback to localStorage if server fails
    console.warn('Server API failed, using localStorage:', error);
    const files = getLocalStorageFiles();
    if (files[path]) {
      files[path].content = content;
      setLocalStorageFiles(files);
    }
  }
}

// Delete file or directory
export async function deleteFile(path: string): Promise<void> {
  if (useLocalFolderMode) {
    const dir = getConnectedDirectoryHandle();
    if (!dir) throw new Error('Local folder not connected');
    await localDeleteEntry(dir, path);
    return;
  }

  if (isBlobStorageAvailable()) {
    // Use Vercel Blob in production
    try {
      const response = await fetch(`/api/blob/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete file from blob storage');
      }
      return;
    } catch (error) {
      console.warn('Blob storage failed, using localStorage:', error);
      const files = getLocalStorageFiles();
      delete files[path];
      setLocalStorageFiles(files);
      return;
    }
  }
  
  try {
    const response = await fetch(`/api/files/${path}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete file');
    }
  } catch (error) {
    // Fallback to localStorage if server fails
    console.warn('Server API failed, using localStorage:', error);
    const files = getLocalStorageFiles();
    delete files[path];
    setLocalStorageFiles(files);
  }
}

// Get file content
export async function getFile(path: string): Promise<FileItem> {
  if (useLocalFolderMode) {
    const dir = getConnectedDirectoryHandle();
    if (!dir) throw new Error('Local folder not connected');
    const content = await localReadFile(dir, path);
    return { name: path, type: 'file', path, content };
  }

  if (isBlobStorageAvailable()) {
    // Use Vercel Blob in production
    try {
      const response = await fetch(`/api/blob/get?path=${encodeURIComponent(path)}`);
      if (!response.ok) {
        throw new Error('Failed to get file from blob storage');
      }
      return response.json();
    } catch (error) {
      console.warn('Blob storage failed, using localStorage:', error);
      const files = getLocalStorageFiles();
      if (files[path]) {
        return files[path];
      }
      throw new Error('File not found');
    }
  }
  
  try {
    const response = await fetch(`/api/files/${path}`);
    if (!response.ok) {
      throw new Error('Failed to get file');
    }
    return response.json();
  } catch (error) {
    // Fallback to localStorage if server fails
    console.warn('Server API failed, using localStorage:', error);
    const files = getLocalStorageFiles();
    if (files[path]) {
      return files[path];
    }
    throw new Error('File not found');
  }
}