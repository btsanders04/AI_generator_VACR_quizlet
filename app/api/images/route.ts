import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const baseDir = path.join(process.cwd(), 'public', 'pictures', 'NCR 24 VACR Training', 'Aircrafts NCR24');

function getSubfolders() {
  return fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
}

function getRandomImage(folder: string) {
  const folderPath = path.join(baseDir, folder);
  const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.jpg'));
  const randomFile = files[Math.floor(Math.random() * files.length)];
  return {
    url: `/pictures/NCR 24 VACR Training/Aircrafts NCR24/${folder}/${randomFile}`,
    answer: folder
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const count = searchParams.get('count');

  const subfolders = getSubfolders();
  const shuffledFolders = [...subfolders].sort(() => 0.5 - Math.random());

  if (count === 'single') {
    const selectedFolder = shuffledFolders[0];
    const image = getRandomImage(selectedFolder);
    return NextResponse.json(image);
  } else {
    const selectedFolders = shuffledFolders.slice(0, 5);
    const images = selectedFolders.map(folder => getRandomImage(folder));
    return NextResponse.json(images);
  }
}
