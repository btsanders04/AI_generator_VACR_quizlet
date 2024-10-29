'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Aircraft } from '@/app/types/aircraft';
import ImageCarousel from './ImageCarousel';
import { getAllAircraft } from '@/app/lib/get-aircraft';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AnswerKey() {
  const router = useRouter();
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);

  useEffect(() => {
    const loadAircraft = () => {
      try {
        const allAircraft = getAllAircraft();
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {aircraft.map(ac => (
        <Card 
          key={ac.key}
          onClick={() => handleAircraftClick(ac.key)}
          className="object-containing"
        >
          <CardHeader>
            <CardTitle>
              {ac.key}
            </CardTitle>
          </CardHeader>
          <CardContent>
           
            <ImageCarousel images={ac.imageurls || []} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
