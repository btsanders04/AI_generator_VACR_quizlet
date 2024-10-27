'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Aircraft } from '@/app/types/aircraft';
import ImageCarousel from './ImageCarousel';
import { getAllAircraft } from '@/app/lib/get-aircraft';

export default function AnswerKey() {
  const router = useRouter();
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);

  useEffect(() => {
    const loadAircraft = async () => {
      try {
        const allAircraft = await getAllAircraft();  
        
        setAircraft(allAircraft);
      } catch (error) {
        console.error('Error loading aircraft data:', error);
      }
    };

    loadAircraft();
  }, []);

  const handleAircraftClick = (key: string) => {
    router.push(`/aircraft/${key}`);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Aircraft Answer Key</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       {aircraft.map((ac) => (
            <div 
              key={ac.key}
              onClick={() => handleAircraftClick(ac.key)}
              className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-4">{ac.key}</h2>
              <ImageCarousel
                images={ac.imageUrls || []}
              />
            </div>
        ))}
      </div>
    </div>
  );
}
