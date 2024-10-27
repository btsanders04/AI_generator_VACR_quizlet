import aircraftDataJson from '../../public/aircraft-meta.json';
import { ListBlobResultBlob } from '@vercel/blob';
import { Aircraft, AircraftImageData } from '../types/aircraft';

const getBlobs = async (): Promise<ListBlobResultBlob[]> => {
  try {
    const response = await fetch('/get-aircraft');
    const blobs: ListBlobResultBlob[] = await response.json();
    return blobs;
  } catch (error) {
    console.error('Error fetching blobs:', error);
    return [];
  }
};

export const getAllAircraft = async (): Promise<Aircraft[]> => {
  const aircraft = await getBlobs();
  return aircraftDataJson
    .filter(ac => ac.hltag)
    .map(aircraftData => ({
      ...aircraftData,
      imageUrls: aircraft
        .filter(blob => blob.pathname.startsWith(aircraftData.key as string))
        .map(blob => blob.url),
    }));
};

export const getAircraft = async (aircraftName: string): Promise<Aircraft | undefined> => {
  const allAircraft = await getAllAircraft();
  return allAircraft.find(aircraft => aircraft.key === aircraftName);
};

export const getRandomAircraft = async (): Promise<Aircraft> => {
  const allAircraft = await getAllAircraft();
  const randomIndex = Math.floor(Math.random() * allAircraft.length);
  return allAircraft[randomIndex];
};

export const getRandomAircraftImage = async (): Promise<AircraftImageData> => {
  const allAircraft = await getAllAircraft();

  // Create array of all images with their aircraft keys
  const allImages = allAircraft.flatMap(aircraft =>
    aircraft.imageUrls.map(url => ({
      url: url,
      answers: [aircraft.key, ...aircraft.altNames],
    }))
  );

  // Select random image
  const randomIndex = Math.floor(Math.random() * allImages.length);
  return allImages[randomIndex];
};
