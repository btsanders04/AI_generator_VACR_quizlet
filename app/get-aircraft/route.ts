import { list, ListBlobResult, ListBlobResultBlob } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse<ListBlobResultBlob[]>> {
  try {
    let allBlobs: ListBlobResultBlob[] = [];
    let currentCursor: string | undefined = undefined;

    do {
      const result: ListBlobResult = await list({ cursor: currentCursor });
      allBlobs = [...allBlobs, ...result.blobs];
      currentCursor = result.cursor;
    } while (currentCursor);

    return NextResponse.json(allBlobs);
  } catch (error) {
    console.error('Error fetching blobs:', error);
    return NextResponse.json([], { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
