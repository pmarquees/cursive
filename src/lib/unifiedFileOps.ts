// Unified file operations - Client-side workspace mode management
// This module handles client-side workspace mode without server dependencies

export interface FileOperationResult {
  success: boolean;
  error?: string;
  fileName?: string;
  content?: string;
  files?: string[];
  directories?: string[];
  message?: string;
  // For local operations, include instructions for client
  localOperation?: boolean;
  operation?: string;
  data?: {
    fileName?: string;
    content?: string;
    directory?: string;
  };
}

let currentWorkspaceMode: 'local' | 'remote' = 'remote';

export function setWorkspaceMode(mode: 'local' | 'remote') {
  currentWorkspaceMode = mode;
  console.log('Workspace mode set to:', mode);
}

export function getWorkspaceMode(): 'local' | 'remote' {
  return currentWorkspaceMode;
}

// These functions return instructions for local operations or make API calls for remote operations
export async function createFile(fileName: string, content: string): Promise<FileOperationResult> {
  console.log('createFile called with mode:', currentWorkspaceMode, 'fileName:', fileName);
  
  if (currentWorkspaceMode === 'local') {
    console.log('Returning local operation instructions for:', fileName);
    // Return instructions for client-side execution
    return {
      success: true,
      localOperation: true,
      operation: 'create',
      data: { fileName, content },
      fileName,
      content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
      message: `File ${fileName} will be created in local workspace`
    };
  }
  
  console.log('Making API call for remote operation:', fileName);
  // Make API call for remote operations
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/files`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: fileName,
        type: 'file',
        content,
        path: ''
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create file');
    }

    await response.json();
    return {
      success: true,
      fileName,
      content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
      message: `Created file: ${fileName}`
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to create file: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function updateFile(fileName: string, content: string): Promise<FileOperationResult> {
  if (currentWorkspaceMode === 'local') {
    return {
      success: true,
      localOperation: true,
      operation: 'update',
      data: { fileName, content },
      fileName,
      content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
      message: `File ${fileName} will be updated in local workspace`
    };
  }

  // Make API call for remote operations
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/files/${fileName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error('Failed to update file');
    }

    return {
      success: true,
      fileName,
      content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
      message: `Updated file: ${fileName}`
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to update file: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function readFile(fileName: string): Promise<FileOperationResult> {
  if (currentWorkspaceMode === 'local') {
    return {
      success: true,
      localOperation: true,
      operation: 'read',
      data: { fileName },
      fileName,
      content: '', // Will be filled by client
      message: `File ${fileName} will be read from local workspace`
    };
  }

  // Make API call for remote operations
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/files/${fileName}`);
    if (!response.ok) {
      throw new Error('Failed to read file');
    }

    const result = await response.json();
    return {
      success: true,
      fileName,
      content: result.content,
      message: `Read file: ${fileName}`
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function listFiles(directory: string = ''): Promise<FileOperationResult> {
  if (currentWorkspaceMode === 'local') {
    return {
      success: true,
      localOperation: true,
      operation: 'list',
      data: { directory },
      files: [], // Will be filled by client
      directories: [], // Will be filled by client
      message: `Files will be listed from local workspace directory: ${directory || 'root'}`
    };
  }

  // Make API call for remote operations
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/files?path=${encodeURIComponent(directory)}`);
    if (!response.ok) {
      throw new Error('Failed to list files');
    }

    interface FileItem {
      name: string;
      type: 'file' | 'directory';
      path: string;
      content?: string;
    }
    
    interface ApiResponse {
      files: FileItem[];
    }
    
    const result = await response.json() as ApiResponse;
    const files = result.files
      .filter((item) => item.type === 'file')
      .map((item) => item.name);
      
    const directories = result.files
      .filter((item) => item.type === 'directory')
      .map((item) => item.name);

    return {
      success: true,
      files,
      directories,
      message: `Listed ${files.length} files and ${directories.length} directories`
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to list files: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}

export async function deleteFile(fileName: string): Promise<FileOperationResult> {
  if (currentWorkspaceMode === 'local') {
    return {
      success: true,
      localOperation: true,
      operation: 'delete',
      data: { fileName },
      fileName,
      message: `File ${fileName} will be deleted from local workspace`
    };
  }

  // Make API call for remote operations
  try {
    const baseUrl = typeof window !== 'undefined' ? '' : 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/files/${fileName}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete file');
    }

    return {
      success: true,
      fileName,
      message: `Deleted file: ${fileName}`
    };
  } catch (error) {
    return {
      success: false,
      error: `Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
}