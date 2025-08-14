import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// POST - Save/update file content in Vercel Blob
export async function POST(request: NextRequest) {
  console.log('💾 [Blob] Save endpoint called');
  
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
        error: 'Blob storage not configured - missing BLOB_READ_WRITE_TOKEN' 
      }, { status: 500 });
    }
    
    const requestBody = await request.json();
    console.log('📨 [Blob] Request data:', {
      path: requestBody.path,
      contentLength: requestBody.content?.length || 0,
      contentType: typeof requestBody.content
    });
    
    const { path, content } = requestBody;
    
    if (!path) {
      console.error('❌ [Blob] Missing path in request');
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }
    
    if (content === undefined || content === null) {
      console.error('❌ [Blob] Missing content in request');
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }
    
    // Create the full path for the file
    const fullPath = `files/${path}`;
    console.log('📁 [Blob] Uploading to path:', fullPath);
    
    // Upload/update file in Vercel Blob
    console.log('⬆️ [Blob] Starting upload to Vercel Blob...');
    const result = await put(fullPath, content, {
      access: 'public',
      contentType: 'text/plain',
      allowOverwrite: true, // Allow overwriting existing files
    });
    
    console.log('✅ [Blob] Upload successful:', {
      url: result.url,
      pathname: result.pathname
    });
    
    return NextResponse.json({
      success: true,
      url: result.url,
      pathname: result.pathname
    });
  } catch (error) {
    console.error('❌ [Blob] Error saving file:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    
    // Return more specific error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Failed to save file to blob storage',
      details: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}