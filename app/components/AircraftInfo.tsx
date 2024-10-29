'use client';

import React, { useEffect, useState } from 'react';
import ImageCarousel from './ImageCarousel';
import { getAircraft } from '@/app/lib/get-aircraft';
import { Aircraft } from '@/app/types/aircraft';
interface AircraftInfoProps {
  aircraft: string;
}

const AircraftInfo = ({ aircraft }: AircraftInfoProps) => {
  const [aircraftData, setAircraftData] = useState<Aircraft | undefined>(undefined);

  useEffect(() => {
    const loadAircraft = async () => {
      try {
        const ac = await getAircraft(aircraft);
        setAircraftData(ac);
      } catch (error) {
        console.error('Error loading aircraft data:', error);
      }
    };
    loadAircraft();
  }, [aircraft]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">{aircraft}</h1>
        <ImageCarousel images={aircraftData?.imageUrls || []} />

        <h2 className="text-1xl text-center font-bold text-left text-black">General Data</h2>
        <div className="text-gray-600">
          {aircraftData?.generalData.map(item => (
            <p
              key={`general-${item.key}`}
              className="flex items-center gap-2 p-3 bg-gray-100  group transition-colors duration-200"
            >
              {item.key}: {item.value}
            </p>
          ))}
        </div>
        <h2 className="text-1xl text-center  font-bold text-left text-black">Weft Description</h2>
        <div className=" text-gray-600">
          {aircraftData?.weftDescription.map(item => (
            <p
              key={`weft-${item.key}`}
              className="flex items-center gap-2 p-3 bg-gray-100 group  transition-colors duration-200"
            >
              {item.key}: {item.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AircraftInfo;
