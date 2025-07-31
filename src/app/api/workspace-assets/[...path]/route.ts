import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const WORKSPACE_DIR = path.join(process.cwd(), 'workspace');

// GET - Serve static files from workspace directory
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const resolvedParams = await params;
  try {
    console.log('Workspace Assets GET - raw params:', resolvedParams);
    console.log('Workspace Assets GET - URL:', request.url);
    
    // Extract the actual file path from the URL
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/');
    console.log('Workspace Assets GET - URL path segments:', pathSegments);
    
    // Find the index of 'workspace-assets' and get everything after it
    const workspaceAssetsIndex = pathSegments.indexOf('workspace-assets');
    if (workspaceAssetsIndex === -1 || workspaceAssetsIndex === pathSegments.length - 1) {
      console.log('Workspace Assets GET - Invalid path structure');
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    
    const filePath = pathSegments.slice(workspaceAssetsIndex + 1).join('/');
    const fullPath = path.join(WORKSPACE_DIR, filePath);
    
    console.log('Workspace Assets GET - extracted filePath:', filePath);
    console.log('Workspace Assets GET - fullPath:', fullPath);
    console.log('Workspace Assets GET - WORKSPACE_DIR:', WORKSPACE_DIR);
    
    // Security check
    if (!fullPath.startsWith(WORKSPACE_DIR)) {
      console.log('Workspace Assets GET - Security check failed');
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    
    // Check if file exists
    try {
      await fs.access(fullPath);
      console.log('Workspace Assets GET - File exists');
    } catch (error) {
      console.log('Workspace Assets GET - File not found:', error);
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    // Read file content
    const content = await fs.readFile(fullPath);
    
    // Determine content type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'text/plain';
    
    switch (ext) {
      case '.css':
        contentType = 'text/css';
        break;
      case '.js':
        contentType = 'application/javascript';
        break;
      case '.html':
        contentType = 'text/html';
        break;
      case '.json':
        contentType = 'application/json';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.svg':
        contentType = 'image/svg+xml';
        break;
      case '.ico':
        contentType = 'image/x-icon';
        break;
    }
    
    return new NextResponse(content, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache', // Disable caching for development
      },
    });
  } catch (error) {
    console.error('Error serving workspace asset:', error);
    return NextResponse.json({ error: 'Failed to serve file' }, { status: 500 });
  }
}