// AI Tools for file operations that the AI can call automatically

import { tool } from 'ai';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';

const WORKSPACE_DIR = path.join(process.cwd(), 'workspace');

// Server-side workspace mode management
let currentWorkspaceMode: 'local' | 'remote' = 'remote';

export function setWorkspaceMode(mode: 'local' | 'remote') {
  currentWorkspaceMode = mode;
  console.log('AI Tools: Setting workspace mode to:', mode);
}

// Security check for file paths
function isValidPath(filePath: string): boolean {
  const fullPath = path.join(WORKSPACE_DIR, filePath);
  return fullPath.startsWith(WORKSPACE_DIR) && !filePath.includes('..');
}

// Ensure workspace directory exists
async function ensureWorkspaceDir() {
  try {
    await fs.access(WORKSPACE_DIR);
  } catch {
    await fs.mkdir(WORKSPACE_DIR, { recursive: true });
  }
}

export const aiTools = {
  // Tool for creating new files
  createFile: tool({
    description: 'Create a new file with specified content',
    parameters: z.object({
      fileName: z.string().describe('Name of the file to create (e.g., "index.html", "script.js")'),
      content: z.string().describe('Content to write to the file'),
      reason: z.string().describe('Brief explanation of why this file is being created'),
    }),
    execute: async ({ fileName, content, reason }) => {
      try {
        console.log('AI Tools createFile: mode =', currentWorkspaceMode, 'fileName =', fileName);
        
        if (currentWorkspaceMode === 'local') {
          // Return instructions for client-side execution
          console.log('Returning local operation instructions for:', fileName);
          return {
            success: true,
            localOperation: true,
            operation: 'create',
            data: { fileName, content },
            fileName,
            content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
            message: `Created file: ${fileName}. ${reason}`
          };
        }
        
        // Handle remote (server-side) operation directly
        console.log('Performing remote file operation for:', fileName);
        await ensureWorkspaceDir();
        
        if (!isValidPath(fileName)) {
          return { success: false, error: 'Invalid file path' };
        }

        const fullPath = path.join(WORKSPACE_DIR, fileName);
        await fs.mkdir(path.dirname(fullPath), { recursive: true });
        await fs.writeFile(fullPath, content, 'utf-8');

        return {
          success: true,
          fileName,
          content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
          message: `Created file: ${fileName}. ${reason}`
        };
      } catch (error) {
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
    parameters: z.object({
      fileName: z.string().describe('Name of the file to update'),
      content: z.string().describe('New content for the file'),
      reason: z.string().describe('Brief explanation of what changes were made'),
    }),
    execute: async ({ fileName, content, reason }) => {
      try {
        console.log('AI Tools updateFile: mode =', currentWorkspaceMode, 'fileName =', fileName);
        
        if (currentWorkspaceMode === 'local') {
          return {
            success: true,
            localOperation: true,
            operation: 'update',
            data: { fileName, content },
            fileName,
            content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
            message: `Updated file: ${fileName}. ${reason}`
          };
        }
        
        await ensureWorkspaceDir();
        if (!isValidPath(fileName)) {
          return { success: false, error: 'Invalid file path' };
        }

        const fullPath = path.join(WORKSPACE_DIR, fileName);
        try {
          await fs.access(fullPath);
        } catch {
          return { success: false, error: 'File does not exist' };
        }
        await fs.writeFile(fullPath, content, 'utf-8');

        return {
          success: true,
          fileName,
          content: content.slice(0, 200) + (content.length > 200 ? '...' : ''),
          message: `Updated file: ${fileName}. ${reason}`
        };
      } catch (error) {
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
    parameters: z.object({
      fileName: z.string().describe('Name of the file to read'),
    }),
    execute: async ({ fileName }) => {
      try {
        console.log('AI Tools readFile: mode =', currentWorkspaceMode, 'fileName =', fileName);
        
        if (currentWorkspaceMode === 'local') {
          return {
            success: true,
            localOperation: true,
            operation: 'read',
            data: { fileName },
            fileName,
            content: '',
            message: `Read file: ${fileName}`
          };
        }
        
        await ensureWorkspaceDir();
        if (!isValidPath(fileName)) {
          return { success: false, error: 'Invalid file path' };
        }

        const fullPath = path.join(WORKSPACE_DIR, fileName);
        const content = await fs.readFile(fullPath, 'utf-8');

        return {
          success: true,
          fileName,
          content,
          message: `Read file: ${fileName}`
        };
      } catch (error) {
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
    parameters: z.object({
      directory: z.string().optional().describe('Subdirectory to list (optional, defaults to root)'),
    }),
    execute: async ({ directory = '' }) => {
      try {
        console.log('AI Tools listFiles: mode =', currentWorkspaceMode, 'directory =', directory);
        
        if (currentWorkspaceMode === 'local') {
          return {
            success: true,
            localOperation: true,
            operation: 'list',
            data: { directory },
            files: [],
            directories: [],
            message: `Listed files from local workspace`
          };
        }
        
        await ensureWorkspaceDir();
        if (!isValidPath(directory)) {
          return { success: false, error: 'Invalid directory path' };
        }

        const fullPath = path.join(WORKSPACE_DIR, directory);
        const items = await fs.readdir(fullPath, { withFileTypes: true });

        const files = items
          .filter(item => item.isFile())
          .map(item => item.name);
          
        const directories = items
          .filter(item => item.isDirectory())
          .map(item => item.name);

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
    parameters: z.object({
      fileName: z.string().describe('Name of the file to delete'),
      reason: z.string().describe('Brief explanation of why this file is being deleted'),
    }),
    execute: async ({ fileName, reason }) => {
      try {
        console.log('AI Tools deleteFile: mode =', currentWorkspaceMode, 'fileName =', fileName);
        
        if (currentWorkspaceMode === 'local') {
          return {
            success: true,
            localOperation: true,
            operation: 'delete',
            data: { fileName },
            fileName,
            message: `Deleted file: ${fileName}. ${reason}`
          };
        }
        
        await ensureWorkspaceDir();
        if (!isValidPath(fileName)) {
          return { success: false, error: 'Invalid file path' };
        }

        const fullPath = path.join(WORKSPACE_DIR, fileName);
        await fs.unlink(fullPath);

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