import { NextRequest, NextResponse } from 'next/server';
import { deleteAircraftImageUrl } from '@/app/lib/db-functions';
import { updateAircraftImageUrl } from '@/app/lib/db-functions'
import { NextApiRequest } from 'next';

interface ImageData {
  filename: string;
  name: string;
  mime: string;
  extension: string;
  url: string;
 }
 
 interface UploadData {
  id: string;
  title: string;
  url_viewer: string;
  url: string;
  display_url: string;
  width: string;
  height: string;
  size: string;
  time: string;
  expiration: string;
  image: ImageData;
  thumb: ImageData;
  medium: ImageData;
  delete_url: string;
 }
 
 interface ImageUploadResponse {
  data: UploadData;
  success: boolean;
  status: number;
 }

export async function DELETE(request: NextApiRequest,   { params }: { params: { name: string }}) {
  try {
    const key = await (params).name;
    const {imageUrl} = request.query

    if (!imageUrl || typeof imageUrl !== 'string') {
      return NextResponse.json({ error: 'No URL provided' }, { status: 400 });
    }

    const aircraft = await deleteAircraftImageUrl(key,imageUrl);

    if(!aircraft){
        throw new Error(`Failed To Delete'}`);
    }
    return NextResponse.json(aircraft);
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}

// import { put } from '@vercel/blob';

   

export async function PUT(request: NextRequest,  { params }: { params: { name: string } }) {
  try {
    const key = await (params).name;
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    const api_key = process.env.IMGBB_API_KEY;
    console.log(api_key)
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${api_key}`, {
        method: 'POST',
        body: formData
    });

    const responseJson: ImageUploadResponse = await response.json();
    if (!response.ok) {
        // Option 1: Throw with status and message
        throw new Error(`HTTP error! status: ${response.status}, message: ${response.json() || 'Unknown error'}`);
    }
    console.log(responseJson);
    const updatedAircraft = await updateAircraftImageUrl(decodeURI(key), responseJson.data.display_url);
    return NextResponse.json(updatedAircraft);

    // Create a clean filename

    // Create path with folder structure
    // const path = folder ? `${folder}/${cleanName}` : cleanName;
    
    // Upload to Vercel Blob
    // const blob = await put(path, file, {
    //   access: 'public',
    //   addRandomSuffix: false, // Keep original filename
    // });
    

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

