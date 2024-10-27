import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Create a clean filename
    const cleanName = file.name.replace(/[^a-zA-Z0-9-_.]/g, '_');

    // Create path with folder structure
    const path = folder ? `${folder}/${cleanName}` : cleanName;

    // Upload to Vercel Blob
    const blob = await put(path, file, {
      access: 'public',
      addRandomSuffix: false, // Keep original filename
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
