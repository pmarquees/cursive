import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

// GET - Debug storage status
export async function GET() {
  try {
    const isProduction = process.env.VERCEL || process.env.NODE_ENV === 'production';
    const hasToken = !!process.env.BLOB_READ_WRITE_TOKEN;
    
    let blobFiles: Array<{path: string; url: string; size: number}> = [];
    let blobError: string | null = null;
    
    if (hasToken) {
      try {
        const { blobs } = await list({ prefix: 'files/' });
        blobFiles = blobs.map(blob => ({
          path: blob.pathname.replace('files/', ''),
          url: blob.url,
          size: blob.size
        }));
      } catch (error) {
        blobError = error instanceof Error ? error.message : 'Unknown blob error';
      }
    }
    
    return NextResponse.json({
      environment: {
        isProduction,
        hasVercelEnv: !!process.env.VERCEL,
        nodeEnv: process.env.NODE_ENV,
        hasBlobToken: hasToken,
      },
      blobStorage: {
        filesCount: blobFiles.length,
        files: blobFiles,
        error: blobError,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}