import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

// POST - Create file in Vercel Blob
export async function POST(request: NextRequest) {
  try {
    const { name, type, content = '', path: filePath = '' } = await request.json();
    
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
    
    // Upload file to Vercel Blob
    const { url } = await put(fullPath, content, {
      access: 'public',
      contentType: 'text/plain',
      allowOverwrite: true, // Allow overwriting existing files
    });
    
    const relativePath = fullPath.replace('files/', '');
    
    return NextResponse.json({
      success: true,
      file: {
        type: 'file',

        file: {
          name,
          path: relativePath,
          content,
          url
        }
      },
    });
  } catch (error) {
    console.error('Error creating blob file:', error);
    return NextResponse.json({ error: 'Failed to create file' }, { status: 500 });
  }
}