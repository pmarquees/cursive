// Local file system access using File System Access API
import { FileItem } from './fileApi';

export interface LocalWorkspace {
  name: string;
  handle: FileSystemDirectoryHandle;
}

let currentWorkspace: LocalWorkspace | null = null;

// Check if File System Access API is supported
export function isFileSystemAccessSupported(): boolean {
  return 'showDirectoryPicker' in window;
}

// Connect to a local folder
export async function connectToLocalFolder(): Promise<LocalWorkspace> {
  if (!isFileSystemAccessSupported()) {
    throw new Error('File System Access API is not supported in this browser');
  }

  try {
    const directoryHandle = await window.showDirectoryPicker({
      mode: 'readwrite',
    });

    const workspace: LocalWorkspace = {
      name: directoryHandle.name,
      handle: directoryHandle,
    };

    currentWorkspace = workspace;
    return workspace;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('User cancelled folder selection');
    }
    throw new Error('Failed to access local folder');
  }
}

// Get current workspace
export function getCurrentWorkspace(): LocalWorkspace | null {
  return currentWorkspace;
}

// List files in the current workspace
export async function listLocalFiles(path: string = ''): Promise<FileItem[]> {
  if (!currentWorkspace) {
    throw new Error('No workspace connected');
  }

  try {
    let targetDir = currentWorkspace.handle;
    
    // Navigate to the specified path
    if (path) {
      const pathParts = path.split('/').filter(part => part);
      for (const part of pathParts) {
        targetDir = await targetDir.getDirectoryHandle(part);
      }
    }

    const files: FileItem[] = [];
    
    for await (const [name, handle] of targetDir.entries()) {
      const relativePath = path ? `${path}/${name}` : name;
      
      if (handle.kind === 'directory') {
        files.push({
          name,
          type: 'directory',
          path: relativePath,
        });
      } else if (handle.kind === 'file') {
        const fileHandle = handle as FileSystemFileHandle;
        const file = await fileHandle.getFile();
        const content = await file.text();
        
        files.push({
          name,
          type: 'file',
          path: relativePath,
          content,
        });
      }
    }

    return files.sort((a, b) => {
      // Directories first, then files
      if (a.type !== b.type) {
        return a.type === 'directory' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
  } catch {
    throw new Error('Failed to list local files');
  }
}

// Save file to local workspace
export async function saveLocalFile(path: string, content: string): Promise<void> {
  if (!currentWorkspace) {
    throw new Error('No workspace connected');
  }

  try {
    const pathParts = path.split('/').filter(part => part);
    const fileName = pathParts.pop()!;
    
    let targetDir = currentWorkspace.handle;
    
    // Navigate to the parent directory
    for (const part of pathParts) {
      try {
        targetDir = await targetDir.getDirectoryHandle(part);
      } catch {
        // Create directory if it doesn't exist
        targetDir = await targetDir.getDirectoryHandle(part, { create: true });
      }
    }

    // Get or create the file
    const fileHandle = await targetDir.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
  } catch {
    throw new Error('Failed to save local file');
  }
}

// Create file or directory in local workspace
export async function createLocalFile(
  name: string,
  type: 'file' | 'directory' = 'file',
  content: string = '',
  path: string = ''
): Promise<FileItem> {
  if (!currentWorkspace) {
    throw new Error('No workspace connected');
  }

  try {
    const pathParts = path ? path.split('/').filter(part => part) : [];
    let targetDir = currentWorkspace.handle;
    
    // Navigate to the target directory
    for (const part of pathParts) {
      try {
        targetDir = await targetDir.getDirectoryHandle(part);
      } catch {
        targetDir = await targetDir.getDirectoryHandle(part, { create: true });
      }
    }

    const relativePath = path ? `${path}/${name}` : name;

    if (type === 'directory') {
      await targetDir.getDirectoryHandle(name, { create: true });
      return {
        name,
        type: 'directory',
        path: relativePath,
      };
    } else {
      const fileHandle = await targetDir.getFileHandle(name, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();
      
      return {
        name,
        type: 'file',
        path: relativePath,
        content,
      };
    }
  } catch {
    throw new Error('Failed to create local file');
  }
}

// Delete file or directory from local workspace
export async function deleteLocalFile(path: string): Promise<void> {
  if (!currentWorkspace) {
    throw new Error('No workspace connected');
  }

  try {
    const pathParts = path.split('/').filter(part => part);
    const itemName = pathParts.pop()!;
    
    let targetDir = currentWorkspace.handle;
    
    // Navigate to the parent directory
    for (const part of pathParts) {
      targetDir = await targetDir.getDirectoryHandle(part);
    }

    await targetDir.removeEntry(itemName, { recursive: true });
  } catch {
    throw new Error('Failed to delete local file');
  }
}

// Get local file content
export async function getLocalFile(path: string): Promise<FileItem> {
  if (!currentWorkspace) {
    throw new Error('No workspace connected');
  }

  try {
    const pathParts = path.split('/').filter(part => part);
    const fileName = pathParts.pop()!;
    
    let targetDir = currentWorkspace.handle;
    
    // Navigate to the parent directory
    for (const part of pathParts) {
      targetDir = await targetDir.getDirectoryHandle(part);
    }

    const fileHandle = await targetDir.getFileHandle(fileName);
    const file = await fileHandle.getFile();
    const content = await file.text();

    return {
      name: fileName,
      type: 'file',
      path,
      content,
    };
  } catch {
    throw new Error('Failed to get local file');
  }
}