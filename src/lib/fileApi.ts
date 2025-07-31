// File system API utilities
import { 
  listLocalFiles, 
  saveLocalFile, 
  createLocalFile, 
  deleteLocalFile, 
  getLocalFile,
  getCurrentWorkspace 
} from './localFileApi';

export interface FileItem {
  name: string;
  type: 'file' | 'directory';
  path: string;
  content?: string;
}

export type WorkspaceMode = 'remote' | 'local';

let currentWorkspaceMode: WorkspaceMode = 'remote';

export interface CreateFileRequest {
  name: string;
  type: 'file' | 'directory';
  content?: string;
  path?: string;
}

// Workspace mode management
export function setWorkspaceMode(mode: WorkspaceMode) {
  currentWorkspaceMode = mode;
  console.log('FileApi: Setting workspace mode to:', mode);
  
  // Sync with unified file operations (avoid circular dependency)
  import('./unifiedFileOps').then(unifiedFileOps => {
    if (unifiedFileOps.setWorkspaceMode) {
      unifiedFileOps.setWorkspaceMode(mode);
      console.log('Synced workspace mode to unified file ops:', mode);
    }
  }).catch(error => {
    console.warn('Failed to sync workspace mode:', error);
  });
}

export function getWorkspaceMode(): WorkspaceMode {
  return currentWorkspaceMode;
}

export function getWorkspaceInfo() {
  if (currentWorkspaceMode === 'local') {
    const workspace = getCurrentWorkspace();
    return {
      mode: 'local' as const,
      name: workspace?.name || 'Local Workspace',
    };
  }
  return {
    mode: 'remote' as const,
    name: 'workspace',
  };
}

// List files and directories
export async function listFiles(path: string = ''): Promise<FileItem[]> {
  if (currentWorkspaceMode === 'local') {
    return listLocalFiles(path);
  }
  
  const response = await fetch(`/api/files?path=${encodeURIComponent(path)}`);
  if (!response.ok) {
    throw new Error('Failed to list files');
  }
  const data = await response.json();
  return data.files;
}

// Create file or directory
export async function createFile(request: CreateFileRequest): Promise<FileItem> {
  if (currentWorkspaceMode === 'local') {
    return createLocalFile(request.name, request.type, request.content || '', request.path || '');
  }
  
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
}

// Save file content
export async function saveFile(path: string, content: string): Promise<void> {
  if (currentWorkspaceMode === 'local') {
    return saveLocalFile(path, content);
  }
  
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
}

// Delete file or directory
export async function deleteFile(path: string): Promise<void> {
  if (currentWorkspaceMode === 'local') {
    return deleteLocalFile(path);
  }
  
  const response = await fetch(`/api/files/${path}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error('Failed to delete file');
  }
}

// Get file content
export async function getFile(path: string): Promise<FileItem> {
  if (currentWorkspaceMode === 'local') {
    return getLocalFile(path);
  }
  
  const response = await fetch(`/api/files/${path}`);
  if (!response.ok) {
    throw new Error('Failed to get file');
  }
  return response.json();
}

// Workspace type detection
export type WorkspaceType = 'html' | 'nextjs' | 'unknown';

export async function detectWorkspaceType(): Promise<WorkspaceType> {
  try {
    // Check for package.json
    const packageJsonFile = await getFile('package.json').catch(() => null);
    
    if (packageJsonFile && packageJsonFile.content) {
      try {
        const packageJson = JSON.parse(packageJsonFile.content);
        
        // Check if Next.js is in dependencies
        const hasNextJs = packageJson.dependencies?.next || packageJson.devDependencies?.next;
        
        if (hasNextJs) {
          return 'nextjs';
        }
      } catch (error) {
        console.warn('Error parsing package.json:', error);
      }
    }
    
    // Check for HTML files at root level
    const files = await listFiles('');
    const hasHtmlFiles = files.some(file => file.name.endsWith('.html'));
    
    if (hasHtmlFiles) {
      return 'html';
    }
    
    return 'unknown';
  } catch (error) {
    console.error('Error detecting workspace type:', error);
    return 'unknown';
  }
}