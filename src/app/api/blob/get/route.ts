import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';

// GET - Get specific file content from Vercel Blob
export async function GET(request: NextRequest) {
  console.log('📖 [Blob] Get endpoint called');
  
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
    
    const { searchParams } = new URL(request.url);
    const path = searchParams.get('path');
    console.log('📨 [Blob] Request data:', { path });
    
    if (!path) {
      console.error('❌ [Blob] Missing path parameter');
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }
    
    // Find the blob by path
    const prefix = `files/${path}`;
    console.log('🔍 [Blob] Searching for blob with prefix:', prefix);
    
    const result = await list({
      prefix,
    });
    
    console.log('📋 [Blob] Search results:', {
      count: result.blobs.length,
      paths: result.blobs.map(b => b.pathname)
    });
    
    // Find the exact match
    const blob = result.blobs.find(b => b.pathname === `files/${path}`);
    
    if (!blob) {
      console.error('❌ [Blob] File not found:', {
        searchPath: `files/${path}`,
        availablePaths: result.blobs.map(b => b.pathname)
      });
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    console.log('✅ [Blob] Found blob:', {
      pathname: blob.pathname,
      url: blob.url
    });
    
    // Fetch the content from the blob URL
    console.log('⬇️ [Blob] Fetching content from blob URL...');
    const response = await fetch(blob.url);
    if (!response.ok) {
      console.error('❌ [Blob] Failed to fetch blob content:', {
        status: response.status,
        statusText: response.statusText,
        url: blob.url
      });
      throw new Error(`Failed to fetch blob content: ${response.status} ${response.statusText}`);
    }
    
    const content = await response.text();
    const name = path.split('/').pop() || '';
    
    console.log('✅ [Blob] Content fetched successfully:', {
      name,
      path,
      contentLength: content.length
    });
    
    // Return a plain file object to match client expectations
    return NextResponse.json({
      name,
      path,
      content
    });
  } catch (error) {
    console.error('❌ [Blob] Error getting file:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Failed to get file from blob storage',
      details: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}