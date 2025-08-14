// AI Tools for file operations that the AI can call automatically

import { tool } from 'ai';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { put, del, list } from '@vercel/blob';

const WORKSPACE_DIR = path.join(process.cwd(), 'workspace');

// Check if we're in production environment (Vercel) where we should use Blob storage
const isProductionEnvironment = () => {
  return process.env.VERCEL || process.env.NODE_ENV === 'production';
};

// Ensure workspace directory exists (only for development)
async function ensureWorkspaceDir() {
  if (isProductionEnvironment()) return;
  try {
    await fs.access(WORKSPACE_DIR);
  } catch {
    await fs.mkdir(WORKSPACE_DIR, { recursive: true });
  }
}

// Security check for file paths
function isValidPath(filePath: string): boolean {
  if (isProductionEnvironment()) {
    // In production, just check for path traversal (allow empty string for root directory)
    return !filePath.includes('..');
  }
  const fullPath = path.join(WORKSPACE_DIR, filePath);
  return fullPath.startsWith(WORKSPACE_DIR) && !filePath.includes('..');
}

// Create file using appropriate storage method
async function createFileInStorage(fileName: string, content: string) {
  if (isProductionEnvironment()) {
    // Use Vercel Blob in production
    const { url } = await put(`files/${fileName}`, content, {
      access: 'public',
      contentType: 'text/plain',
      allowOverwrite: true, // Allow overwriting existing files
    });
    return { url, path: fileName };
  } else {
    // Use filesystem in development
    await ensureWorkspaceDir();
    const fullPath = path.join(WORKSPACE_DIR, fileName);
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content, 'utf-8');
    return { path: fileName };
  }
}

// Update file using appropriate storage method
async function updateFileInStorage(fileName: string, content: string) {
  if (isProductionEnvironment()) {
    // Use Vercel Blob in production
    const { url } = await put(`files/${fileName}`, content, {
      access: 'public',
      contentType: 'text/plain',
      allowOverwrite: true, // Allow overwriting existing files
    });
    return { url, path: fileName };
  } else {
    // Use filesystem in development
    await ensureWorkspaceDir();
    const fullPath = path.join(WORKSPACE_DIR, fileName);
    await fs.writeFile(fullPath, content, 'utf-8');
    return { path: fileName };
  }
}

// Read file using appropriate storage method
async function readFileFromStorage(fileName: string): Promise<string> {
  if (isProductionEnvironment()) {
    // Use Vercel Blob in production
    const { blobs } = await list({
      prefix: `files/${fileName}`,
    });
    
    const blob = blobs.find(b => b.pathname === `files/${fileName}`);
    if (!blob) {
      throw new Error('File not found');
    }
    
    const response = await fetch(blob.url);
    if (!response.ok) {
      throw new Error('Failed to fetch file content');
    }
    
    return await response.text();
  } else {
    // Use filesystem in development
    const fullPath = path.join(WORKSPACE_DIR, fileName);
    return await fs.readFile(fullPath, 'utf-8');
  }
}

// List files using appropriate storage method
async function listFilesInStorage(directory: string = '') {
  if (isProductionEnvironment()) {
    // Use Vercel Blob in production
    const prefix = directory ? `files/${directory}/` : 'files/';
    const { blobs } = await list({ prefix });
    
    const files = blobs.map(blob => {
      const fullPath = blob.pathname.replace('files/', '');
      return fullPath.split('/').pop() || '';
    }).filter(name => name.length > 0);
    
    return { files, directories: [] }; // Blob storage doesn't have explicit directories
  } else {
    // Use filesystem in development
    await ensureWorkspaceDir();
    const fullPath = path.join(WORKSPACE_DIR, directory);
    const items = await fs.readdir(fullPath, { withFileTypes: true });
    
    const files = items
      .filter(item => item.isFile())
      .map(item => item.name);
      
    const directories = items
      .filter(item => item.isDirectory())
      .map(item => item.name);
    
    return { files, directories };
  }
}

// Delete file using appropriate storage method
async function deleteFileFromStorage(fileName: string) {
  if (isProductionEnvironment()) {
    // Use Vercel Blob in production
    const { blobs } = await list({
      prefix: `files/${fileName}`,
    });
    
    const blob = blobs.find(b => b.pathname === `files/${fileName}`);
    if (!blob) {
      throw new Error('File not found');
    }
    
    await del(blob.url);
  } else {
    // Use filesystem in development
    const fullPath = path.join(WORKSPACE_DIR, fileName);
    await fs.unlink(fullPath);
  }
}

export const aiTools = {
  // Tool for creating new files
  createFile: tool({
    description: 'Create a new file with specified content',
    inputSchema: z.object({
      fileName: z.string().describe('Name of the file to create (e.g., "index.html", "script.js")'),
      content: z.string().describe('Content to write to the file'),
      reason: z.string().describe('Brief explanation of why this file is being created'),
    }),
    execute: async ({ fileName, content, reason }) => {
      console.log('📝 [Tool] createFile called:', {
        fileName,
        contentLength: content.length,
        reason,
        isProduction: isProductionEnvironment(),
        timestamp: new Date().toISOString()
      });
      
      try {
        if (!isValidPath(fileName)) {
          console.error('❌ [Tool] createFile: Invalid file path:', fileName);
          return { success: false, error: 'Invalid file path' };
        }

        console.log('✅ [Tool] createFile: Path validation passed');
        
        // Use the appropriate storage method
        const result = await createFileInStorage(fileName, content);
        console.log('✅ [Tool] createFile: File storage completed:', result);
        
        const response = { 
          success: true, 
          fileName,
          message: `Created file: ${fileName}. ${reason}`,
          content
        };
        
        console.log('✅ [Tool] createFile: Success response:', response);
        return response;
      } catch (error) {
        console.error('❌ [Tool] createFile: Error occurred:', {
          fileName,
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
        
        return { 
          success: false, 
          error: `Failed to create file: ${error instanceof Error ? error.message : 'Unknown error'}` 
        };
      }
    },
  }),

  // Tool for updating existing files
  updateFile: tool({
    description: 'Update an existing file with new content',
    inputSchema: z.object({
      fileName: z.string().describe('Name of the file to update'),
      content: z.string().describe('New content for the file'),
      reason: z.string().describe('Brief explanation of what changes were made'),
    }),
    execute: async ({ fileName, content, reason }) => {
      console.log('✏️ [Tool] updateFile called:', {
        fileName,
        contentLength: content.length,
        reason,
        isProduction: isProductionEnvironment(),
        timestamp: new Date().toISOString()
      });
      
      try {
        if (!isValidPath(fileName)) {
          console.error('❌ [Tool] updateFile: Invalid file path:', fileName);
          return { success: false, error: 'Invalid file path' };
        }

        console.log('✅ [Tool] updateFile: Path validation passed');

        // Ensure file exists; if not, create it first
        try {
          console.log('🔍 [Tool] updateFile: Checking if file exists...');
          await readFileFromStorage(fileName);
          console.log('✅ [Tool] updateFile: File exists, proceeding with update');
        } catch {
          console.warn('⚠️ [Tool] updateFile: File missing, creating before update');
          await createFileInStorage(fileName, '');
        }
        
        // Update the file using appropriate storage method
        const result = await updateFileInStorage(fileName, content);
        console.log('✅ [Tool] updateFile: File storage completed:', result);
        
        const response = { 
          success: true, 
          fileName,
          message: `Updated file: ${fileName}. ${reason}`,
          content
        };
        
        console.log('✅ [Tool] updateFile: Success response:', response);
        return response;
      } catch (error) {
        console.error('❌ [Tool] updateFile: Error occurred:', {
          fileName,
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
        
        return { 
          success: false, 
          error: `Failed to update file: ${error instanceof Error ? error.message : 'Unknown error'}` 
        };
      }
    },
  }),

  // Tool for reading file contents
  readFile: tool({
    description: 'Read the contents of a file',
    inputSchema: z.object({
      fileName: z.string().describe('Name of the file to read'),
    }),
    execute: async ({ fileName }) => {
      console.log('📖 [Tool] readFile called:', {
        fileName,
        isProduction: isProductionEnvironment(),
        timestamp: new Date().toISOString()
      });
      
      try {
        if (!isValidPath(fileName)) {
          console.error('❌ [Tool] readFile: Invalid file path:', fileName);
          return { success: false, error: 'Invalid file path' };
        }

        console.log('✅ [Tool] readFile: Path validation passed');

        // Read file using appropriate storage method
        const content = await readFileFromStorage(fileName);
        console.log('✅ [Tool] readFile: File read successfully:', {
          fileName,
          contentLength: content.length
        });
        
        const response = { 
          success: true, 
          fileName,
          content,
          message: `Read file: ${fileName}`
        };
        
        console.log('✅ [Tool] readFile: Success response (content truncated in log)');
        return response;
      } catch (error) {
        console.error('❌ [Tool] readFile: Error occurred:', {
          fileName,
          error: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
        
        return { 
          success: false, 
          error: `Failed to read file: ${error instanceof Error ? error.message : 'Unknown error'}` 
        };
      }
    },
  }),

  // Tool for listing files in the workspace
  listFiles: tool({
    description: 'List all files in the workspace directory',
    inputSchema: z.object({
      directory: z.string().optional().describe('Subdirectory to list (optional, defaults to root)'),
    }),
    execute: async ({ directory = '' }) => {
      try {
        if (!isValidPath(directory)) {
          return { success: false, error: 'Invalid directory path' };
        }

        // List files using appropriate storage method
        const { files, directories } = await listFilesInStorage(directory);
        
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
    },
  }),

  // Tool for deleting files
  deleteFile: tool({
    description: 'Delete a file from the workspace',
    inputSchema: z.object({
      fileName: z.string().describe('Name of the file to delete'),
      reason: z.string().describe('Brief explanation of why this file is being deleted'),
    }),
    execute: async ({ fileName, reason }) => {
      try {
        if (!isValidPath(fileName)) {
          return { success: false, error: 'Invalid file path' };
        }

        // Delete file using appropriate storage method
        await deleteFileFromStorage(fileName);
        
        return { 
          success: true, 
          fileName,
          message: `Deleted file: ${fileName}. ${reason}`
        };
      } catch (error) {
        return { 
          success: false, 
          error: `Failed to delete file: ${error instanceof Error ? error.message : 'Unknown error'}` 
        };
      }
    },
  }),
};