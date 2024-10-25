const baseDir = '/pictures/NCR 24 VACR Training/Aircrafts NCR24';
import aircraftDataJson from '../../public/aircraft-meta.json';

interface ImageData {
  [folder: string]: string[];
}

interface RandomImage {
  url: string;
  answers: string[];
}

export interface AircraftData {
  key: string;
  altNames: string[];
  generalData: GenericKeyValue[],
  weftDescription: GenericKeyValue[],
}

interface GenericKeyValue {
  key: string,
  value: string
}

// Define a type for the require.context function
type RequireContext = (
  directory: string,
  useSubdirectories: boolean,
  regExp: RegExp
) => {
  keys(): string[];
  <T>(id: string): T;
};

// Declare the require.context as a global to avoid TypeScript errors
declare const require: {
  context: RequireContext;
};

function importAll(r: ReturnType<RequireContext>): ImageData {
  return r.keys().reduce<ImageData>((acc, item) => {
    const parts = item.split('/');
    const folder = parts[1];
    const file = parts[2];
    if (!acc[folder]) {
      acc[folder] = [];
    }
    acc[folder].push(file);
    return acc;
  }, {});
}

const images: ImageData = importAll(require.context('../../public/pictures/NCR 24 VACR Training/Aircrafts NCR24', true, /\.jpg$/));
const aircraftData = aircraftDataJson as AircraftData[];

export function getRandomImage(): RandomImage {
  const folders = Object.keys(images);
  const shuffledFolders = [...folders].sort(() => 0.5 - Math.random());
  const selectedFolder = shuffledFolders[0];
  const files = images[selectedFolder];
  const randomFile = files[Math.floor(Math.random() * files.length)];
  
  const encodedBaseDir = encodeURIComponent(baseDir);
  const encodedFolder = encodeURIComponent(selectedFolder);
  const encodedFile = encodeURIComponent(randomFile);
  
  const url = `${encodedBaseDir}/${encodedFolder}/${encodedFile}`.replace(/%2F/g, '/');
  
  return {
    url: url,
    answers: [selectedFolder, ...(aircraftData.find(({key}) => key.toLowerCase() === (selectedFolder.toLowerCase()))?.altNames ?? [])]
  };
}

export function getAllAircraftImages(): ImageData {
  return Object.entries(images).reduce<ImageData>((acc, [folder, files]) => {
    acc[folder] = files.map(file => {
      const encodedBaseDir = encodeURIComponent(baseDir);
      const encodedFolder = encodeURIComponent(folder);
      const encodedFile = encodeURIComponent(file);
      return `${encodedBaseDir}/${encodedFolder}/${encodedFile}`.replace(/%2F/g, '/');
    });
    return acc;
  }, {});
}

export function getAircraftNames(): string[] {
  return Object.keys(images);
}

// New function to get first image for a specific aircraft
export function getAircraftFirstImage(aircraftName: string): string {
  const files = images[aircraftName];
  if (!files || files.length === 0) return '';
  
  const firstFile = files[0];
  const encodedBaseDir = encodeURIComponent(baseDir);
  const encodedFolder = encodeURIComponent(aircraftName);
  const encodedFile = encodeURIComponent(firstFile);
  
  return `${encodedBaseDir}/${encodedFolder}/${encodedFile}`.replace(/%2F/g, '/');
}

// Function to get all images for a specific aircraft
export function getAircraftImages(aircraftName: string): string[] {
  const allImages = getAllAircraftImages();
  return allImages[aircraftName] || [];
}

export function getAircraftData(aircraftName: string): AircraftData | undefined {
  return aircraftData.find(({key}) => key.toLowerCase() === aircraftName.toLowerCase());
}
