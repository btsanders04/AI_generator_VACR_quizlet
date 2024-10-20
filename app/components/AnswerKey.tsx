'use client';

import React, { useEffect, useState } from 'react';
import ImageCarousel from './ImageCarousel';
import { getAllAircraftImages, getAircraftNames } from '../services/fetchImage';

interface ImageData {
  [folder: string]: string[];
}

const AnswerKey: React.FC = () => {
  const [aircraftImages, setAircraftImages] = useState<ImageData>({});
  const [aircraftNames, setAircraftNames] = useState<string[]>([]);

  useEffect(() => {
    setAircraftImages(getAllAircraftImages());
    setAircraftNames(getAircraftNames());
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8">Answer Key</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aircraftNames.map((aircraft) => (
          <div key={aircraft} className="border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-4">{aircraft}</h2>
            <ImageCarousel
              images={aircraftImages[aircraft] || []}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnswerKey;
