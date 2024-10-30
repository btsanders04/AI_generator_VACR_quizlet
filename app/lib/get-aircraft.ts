import aircraftDataJson from '../../public/aircraft-meta.json';
import { Aircraft, AircraftImageData } from '../types/aircraft';

export const getAllAircraft = (): Aircraft[] => {
  return aircraftDataJson.filter(ac => !ac.hltag.includes('hide'));
};

export const getAllAircraftNames = (): string[] => {
  return getAllAircraft().map(ac => ac.key);
};

export const getAircraft = (aircraftName: string): Aircraft | undefined => {
  const allAircraft = getAllAircraft();
  return allAircraft.find(aircraft => aircraft.key === aircraftName);
};

export const getAircraftExcluding = (aircraftName: string): Aircraft[] => {
  const allAircraft = getAllAircraft();
  return allAircraft.filter(aircraft => aircraft.key !== aircraftName);
};

export const getRandomAircraft = (): Aircraft => {
  const allAircraft = getAllAircraft();
  const randomIndex = Math.floor(Math.random() * allAircraft.length);
  return allAircraft[randomIndex];
};

export const getRandomAircraftImage = (): AircraftImageData => {
  const allAircraft = getAllAircraft();

  // Create array of all images with their aircraft keys
  const allImages = allAircraft.flatMap(aircraft =>
    aircraft.imageurls.map(url => ({
      url: url,
      answers: [aircraft.key, ...aircraft.altNames],
    }))
  );

  // Select random image
  const randomIndex = Math.floor(Math.random() * allImages.length);
  return allImages[randomIndex];
};
