import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const WORKSPACE_DIR = path.join(process.cwd(), 'workspace');

// Ensure workspace directory exists
async function ensureWorkspaceDir() {
  try {
    await fs.access(WORKSPACE_DIR);
  } catch {
    await fs.mkdir(WORKSPACE_DIR, { recursive: true });
  }
}

// GET - List files and directories
export async function GET(request: NextRequest) {
  try {
    await ensureWorkspaceDir();
    
    const { searchParams } = new URL(request.url);
    const dirPath = searchParams.get('path') || '';
    const fullPath = path.join(WORKSPACE_DIR, dirPath);
    
    // Security check - ensure path is within workspace
    if (!fullPath.startsWith(WORKSPACE_DIR)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    
    const items = await fs.readdir(fullPath, { withFileTypes: true });
    const fileList = await Promise.all(
      items.map(async (item) => {
        const itemPath = path.join(fullPath, item.name);
        const relativePath = path.relative(WORKSPACE_DIR, itemPath);
        
        if (item.isDirectory()) {
          return {
            name: item.name,
            type: 'directory',
            path: relativePath,
          };
        } else {
          const content = await fs.readFile(itemPath, 'utf-8');
          return {
            name: item.name,
            type: 'file',
            path: relativePath,
            content,
          };
        }
      })
    );
    
    return NextResponse.json({ files: fileList });
  } catch (error) {
    console.error('Error listing files:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}

// POST - Create file or directory
export async function POST(request: NextRequest) {
  try {
    await ensureWorkspaceDir();
    
    const { name, type, content = '', path: filePath = '' } = await request.json();
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    const fullPath = path.join(WORKSPACE_DIR, filePath, name);
    
    // Security check
    if (!fullPath.startsWith(WORKSPACE_DIR)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    
    // Ensure parent directory exists
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    
    if (type === 'directory') {
      await fs.mkdir(fullPath, { recursive: true });
    } else {
      await fs.writeFile(fullPath, content, 'utf-8');
    }
    
    const relativePath = path.relative(WORKSPACE_DIR, fullPath);
    
    return NextResponse.json({
      success: true,
      file: {
        name,
        type: type || 'file',
        path: relativePath,
        content: type === 'file' ? content : undefined,
      },
    });
  } catch (error) {
    console.error('Error creating file:', error);
    return NextResponse.json({ error: 'Failed to create file' }, { status: 500 });
  }
}