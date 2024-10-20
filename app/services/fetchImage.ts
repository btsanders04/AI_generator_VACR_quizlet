const baseDir = '/pictures/NCR 24 VACR Training/Aircrafts NCR24';
import aircraftDataJson from '../../public/alt-answers.json';
interface ImageData {
  [folder: string]: string[];
}

interface RandomImage {
  url: string;
  answers: string[];
}

interface AircraftNames {
  key: string;
  altNames: string[];
}

// Define a type for the require.context function
type RequireContext = (
  directory: string,
  useSubdirectories: boolean,
  regExp: RegExp
) => {
  keys(): string[];

  (id: string): never;
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
const altAircraftAnswers = aircraftDataJson as AircraftNames[]
export function getRandomImage(): RandomImage {
  const folders = Object.keys(images);
  const shuffledFolders = [...folders].sort(() => 0.5 - Math.random());
  const selectedFolder = shuffledFolders[0];
  const files = images[selectedFolder];
  const randomFile = files[Math.floor(Math.random() * files.length)];
  
  // Encode the URL components
  const encodedBaseDir = encodeURIComponent(baseDir);
  const encodedFolder = encodeURIComponent(selectedFolder);
  const encodedFile = encodeURIComponent(randomFile);
  
  const url = `${encodedBaseDir}/${encodedFolder}/${encodedFile}`.replace(/%2F/g, '/');
  
  return {
    url: url,
    answers: [selectedFolder, ...(altAircraftAnswers.find(({key}) => key.toLowerCase() === (selectedFolder.toLowerCase()))?.altNames ?? [])]
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
