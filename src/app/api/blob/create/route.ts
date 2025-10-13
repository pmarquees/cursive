import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// POST - Create file in Vercel Blob
export async function POST(request: NextRequest) {
  console.log('📝 [Blob] Create endpoint called');
  
  try {
    // Check for required environment variables
    const blobReadWriteToken = process.env.BLOB_READ_WRITE_TOKEN;
    console.log('🔑 [Blob] Environment check:', {
      hasBlobToken: !!blobReadWriteToken,
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV
    });
    
    if (!blobReadWriteToken) {
      console.error('❌ [Blob] Missing BLOB_READ_WRITE_TOKEN environment variable');
      return NextResponse.json({ 
        error: 'Blob storage not configured - missing BLOB_READ_WRITE_TOKEN',
        details: 'Please add Vercel Blob storage to your project in the Vercel dashboard'
      }, { status: 500 });
    }
    
    const { name, type, content = '', path: filePath = '' } = await request.json();
    console.log('📨 [Blob] Create request:', { name, type, filePath, contentLength: content?.length || 0 });
    
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    // Skip directories for now - Vercel Blob doesn't need explicit directory creation
    if (type === 'directory') {
      const dirPath = filePath ? `${filePath}/${name}` : name;
      return NextResponse.json({
        success: true,
        file: {
          name,
          type: 'directory',
          path: dirPath,
        },
      });
    }
    
    // Create the full path for the file
    const fullPath = filePath ? `files/${filePath}/${name}` : `files/${name}`;
    console.log('📁 [Blob] Creating file at path:', fullPath);
    
    // Upload file to Vercel Blob
    const { url } = await put(fullPath, content, {
      access: 'public',
      contentType: 'text/plain',
      allowOverwrite: true, // Allow overwriting existing files
    });
    
    console.log('✅ [Blob] File created successfully:', { url });
    
    const relativePath = fullPath.replace('files/', '');
    
    // Return a proper FileItem in `file`
    return NextResponse.json({
      success: true,
      file: {
        name,
        type: 'file',
        path: relativePath,
        content,
        url
      },
    });
  } catch (error) {
    console.error('❌ [Blob] Error creating file:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Failed to create file in blob storage',
      details: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}