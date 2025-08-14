import { NextRequest, NextResponse } from 'next/server';
import { del, list } from '@vercel/blob';

// DELETE - Delete file from Vercel Blob
export async function DELETE(request: NextRequest) {
  try {
    const { path } = await request.json();
    
    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }
    
    // Find the blob URL by path
    const { blobs } = await list({
      prefix: `files/${path}`,
    });
    
    // Find the exact match
    const blob = blobs.find(b => b.pathname === `files/${path}`);
    
    if (!blob) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
    
    // Delete the blob
    await del(blob.url);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blob file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}