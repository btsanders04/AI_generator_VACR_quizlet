'use client';

import React from 'react';
import Image from 'next/image';
import { getAllAircraftImages } from '../services/fetchImage';

interface AircraftInfoProps {
  aircraft: string;
}

const AircraftInfo: React.FC<AircraftInfoProps> = ({ aircraft }) => {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadImage = () => {
      const allImages = getAllAircraftImages();
      const aircraftImages = allImages[aircraft];
      if (aircraftImages && aircraftImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * aircraftImages.length);
        setImageUrl(aircraftImages[randomIndex]);
      }
    };

    loadImage();
  }, [aircraft]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{aircraft}</h1>
      {imageUrl && (
        <div className="mb-4">
          <Image src={imageUrl} alt={aircraft} width={500} height={300} objectFit="cover" />
        </div>
      )}
      {/* Add more information about the aircraft here if needed */}
    </div>
  );
};

export default AircraftInfo;
