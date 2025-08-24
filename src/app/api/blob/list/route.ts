import { NextRequest, NextResponse } from 'next/server';
import { list } from '@vercel/blob';

// GET - List files from Vercel Blob
export async function GET(request: NextRequest) {
  console.log('📂 [Blob] List endpoint called');
  
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
    const path = searchParams.get('path') || '';
    console.log('📨 [Blob] Request data:', { path });
    
    // List all blobs with the path prefix
    const prefix = path ? `files/${path}/` : 'files/';
    console.log('🔍 [Blob] Listing blobs with prefix:', prefix);
    
    const result = await list({
      prefix,
    });
    
    console.log('📋 [Blob] Found blobs:', {
      count: result.blobs.length,
      blobs: result.blobs.map(b => ({ pathname: b.pathname }))
    });
    
    // Transform blobs to FileItem format
    const files = result.blobs.map((blob) => {
      const fullPath = blob.pathname.replace('files/', '');
      const name = fullPath.split('/').pop() || '';
      
      return {
        name,
        type: 'file' as const,
        path: fullPath,
        url: blob.url, // Store the blob URL for content fetching
      };
    });
    
    console.log('📁 [Blob] Transformed files:', {
      count: files.length,
      files: files.map(f => ({ name: f.name, path: f.path }))
    });
    
    // If no files exist, initialize with default files
    if (files.length === 0 && !path) {
      console.log('🚀 [Blob] No files found, suggesting initialization');
      return NextResponse.json({ files: [], shouldInitialize: true });
    }
    
    return NextResponse.json({ files });
  } catch (error) {
    console.error('❌ [Blob] Error listing files:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : undefined
    });
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ 
      error: 'Failed to list files from blob storage',
      details: errorMessage,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}