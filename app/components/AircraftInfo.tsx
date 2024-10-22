'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getAircraftImages, getAllAircraftImages } from '../services/fetchImage';
import ImageCarousel from './ImageCarousel';

interface AircraftInfoProps {
  aircraft: string;
}

const AircraftInfo: React.FC<AircraftInfoProps> = ({ aircraft }) => {
  const [aircraftImages, setAircraftImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchAircraftImage = () => {
      setAircraftImages(getAircraftImages(aircraft));
    };

    fetchAircraftImage();
  }, [aircraft]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">{aircraft}</h1>
            <ImageCarousel
                images={aircraftImages || []}
              />
        <p className="text-center text-gray-600">
          This is the {aircraft}. Click the back button to return to the answer key.
        </p>
      </div>
    </div>
  );
};

export default AircraftInfo;
