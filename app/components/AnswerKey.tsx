'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Aircraft } from '@/app/types/aircraft';
import { getAllAircraft } from '@/app/lib/get-aircraft';
import { SelectHLTag } from './HLTagFilter';
import AircraftImageCard from './AircraftImageCard';

export default function AnswerKey() {
  const router = useRouter();
  const [aircraft, setAircraft] = useState<Aircraft[]>([]);
  const [selectedTag, setSelectedTag] = useState<string>('');

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

  const filteredAircraft = selectedTag
    ? aircraft.filter(ac => selectedTag === 'default' || ac.hltag?.includes(selectedTag))
    : aircraft;

  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center justify-between w-full max-w-7xl mx-auto mb-8">
        <div className="flex-1" />
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-center flex-1">
          Aircraft Answer Key
        </h1>
        <div className="flex-1 flex justify-end">
          <SelectHLTag onValueChange={setSelectedTag} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 flex-grow">
        {filteredAircraft.map(ac => (
         <AircraftImageCard aircraft={ac} onClick={handleAircraftClick}></AircraftImageCard>
        ))}
      </div>
    </div>
  );
}
