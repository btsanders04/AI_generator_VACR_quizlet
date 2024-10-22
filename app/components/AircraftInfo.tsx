'use client';

import React, { useEffect, useState } from 'react';
import { getAircraftImages, getAircraftData, AircraftData } from '../services/aircraft.service';
import ImageCarousel from './ImageCarousel';

interface AircraftInfoProps {
  aircraft: string;
}

const AircraftInfo: React.FC<AircraftInfoProps> = ({ aircraft }) => {
  const [aircraftImages, setAircraftImages] = useState<string[]>([]);
  const [aircraftData, setAircraftData] = useState<AircraftData|undefined>(undefined);

  useEffect(() => {
    setAircraftImages(getAircraftImages(aircraft));
    setAircraftData(getAircraftData(aircraft));
  }, [aircraft]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">{aircraft}</h1>
            <ImageCarousel
                images={aircraftImages || []}
              />
        
        <h2 className="text-1xl text-center font-bold text-left text-black">General Data</h2>
        <div className="text-gray-600">
         {aircraftData?.generalData.map(item => (
          <p
          className="flex items-center gap-2 p-3 bg-gray-100  group transition-colors duration-200"
          >{item.key}: {item.value}</p>
         ))}
        </div>
        <h2 className="text-1xl text-center  font-bold text-left text-black">Weft Description</h2>
        <div className=" text-gray-600">
         {aircraftData?.weftDescription.map(item => (
          <p
          className="flex items-center gap-2 p-3 bg-gray-100 group  transition-colors duration-200"
          >{item.key}: {item.value}</p>
         ))}
        </div>
      </div>
    </div>
  );
};

export default AircraftInfo;
