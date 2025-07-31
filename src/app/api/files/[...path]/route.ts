import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const WORKSPACE_DIR = path.join(process.cwd(), 'workspace');

// PUT - Save/update file content
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  try {
    const filePath = resolvedParams.path.join('/');
    const fullPath = path.join(WORKSPACE_DIR, filePath);
    
    // Security check
    if (!fullPath.startsWith(WORKSPACE_DIR)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    
    const { content } = await request.json();
    
    // Ensure parent directory exists
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    await fs.writeFile(fullPath, content, 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving file:', error);
    return NextResponse.json({ error: 'Failed to save file' }, { status: 500 });
  }
}

// DELETE - Delete file or directory
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  try {
    const filePath = resolvedParams.path.join('/');
    const fullPath = path.join(WORKSPACE_DIR, filePath);
    
    // Security check
    if (!fullPath.startsWith(WORKSPACE_DIR)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    
    const stats = await fs.stat(fullPath);
    
    if (stats.isDirectory()) {
      await fs.rmdir(fullPath, { recursive: true });
    } else {
      await fs.unlink(fullPath);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}

// GET - Get specific file content
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  try {
    const filePath = resolvedParams.path.join('/');
    const fullPath = path.join(WORKSPACE_DIR, filePath);
    
    // Security check
    if (!fullPath.startsWith(WORKSPACE_DIR)) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    
    const content = await fs.readFile(fullPath, 'utf-8');
    const relativePath = path.relative(WORKSPACE_DIR, fullPath);
    
    return NextResponse.json({
      name: path.basename(fullPath),
      path: relativePath,
      content,
    });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}