import { ListBlobResultBlob } from '@vercel/blob';
import { Aircraft } from '../types/aircraft';
import clientPromise from './mongodb';

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

const getAircraftData = async (): Promise<Aircraft[]> => {
    const client = await clientPromise
    const db = client.db("aircraft")
    const aircraft = await db
      .collection<Aircraft>("Aircraft")
      .find({})
      .toArray();
    return aircraft;
};


export const getAllAircraft = async (): Promise<Aircraft[]> => {
  // const aircraft = await getBlobs();
  const aircraftDataJson = await getAircraftData();;
  return aircraftDataJson
    .map(aircraftData => ({
      ...aircraftData,
      // imageUrls: aircraft
      //   .filter(blob => blob.pathname.startsWith(aircraftData.key as string))
      //   .map(blob => blob.url),
    }));
};

export const getAircraft = async (aircraftName: string): Promise<Aircraft | undefined> => {
  const allAircraft = await getAllAircraft();
  return allAircraft.find(aircraft => aircraft.key === aircraftName);
};


export const updateAircraftImageUrl = async (key: string, imageUrl: string): Promise<Aircraft | null> => {
    console.log(key, imageUrl);
    const client = await clientPromise
    const db = client.db("aircraft")
    const aircraft = await db
      .collection<Aircraft>("Aircraft")
      .findOneAndUpdate(
        { key : key, }, // query to find the document
        { $addToSet: { imageUrls: imageUrl } },  // adds the new URL to the imageUrls array
        { 
            returnDocument: 'after', // returns the updated document
            upsert: false // won't create a new document if none exists
        }
      )
    return aircraft;
};

export const deleteAircraftImageUrl = async (key: string, imageUrl: string): Promise<Aircraft | null> => {
  console.log(key, imageUrl);
  const client = await clientPromise
  const db = client.db("aircraft")
  const aircraft = await db
    .collection<Aircraft>("Aircraft")
    .findOneAndUpdate(
      { key : key, }, // query to find the document
      { $pull: { imageUrls: imageUrl } },  // adds the new URL to the imageUrls array
      { 
          returnDocument: 'after', // returns the updated document
          upsert: false // won't create a new document if none exists
      }
    )
  return aircraft;
};