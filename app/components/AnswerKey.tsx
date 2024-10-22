'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ImageCarousel from './ImageCarousel';
import { getAllAircraftImages, getAircraftNames } from '../services/aircraft.service';

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
      <Link href="/" className="inline-block mb-4 text-blue-600 hover:text-blue-800 underline">
        ← Back to Home
      </Link>
      <h1 className="text-3xl font-bold mb-8">Answer Key</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {aircraftNames.map((aircraft) => (
          <Link href={`/aircraft/${encodeURIComponent(aircraft)}`} key={aircraft}>
            <div className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-4">{aircraft}</h2>
              <ImageCarousel
                images={aircraftImages[aircraft] || []}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AnswerKey;
