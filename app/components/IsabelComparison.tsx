'use client';

import { useState } from 'react';
import { getAircraft, getAllAircraftNames } from '@/app/lib/get-aircraft';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import AircraftImageCard from './AircraftImageCard';
import { Aircraft } from '../types/aircraft';
import { Button } from '@/components/ui/button';
import { analyzeAircraft } from '../lib/aircraft-algorithm';
import { useRouter } from 'next/navigation';

export default function IsabelComparison() {
  const router = useRouter();
  const [selectedAircraft, setSelectedAircraft] = useState<Aircraft | undefined>(undefined);
  const [rankedAircraft, setRankedAircraft] = useState<
    { score: number; aircraft: Aircraft }[] | undefined
  >(undefined);
  const aircraft = getAllAircraftNames();

  const handleAircraftSelect = (aircraftKey: string) => {
    setSelectedAircraft(getAircraft(aircraftKey));
  };

  const handleAnalysis = (aircraftKey: string) => {
    const analysisAircraft = analyzeAircraft(aircraftKey);
    setRankedAircraft(analysisAircraft);
  };

  const handleAircraftClick = (key: string) => {
    router.push(`/aircraft/${key}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="space-y-8">
        {/* Header and Selector Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
            Aircraft Comparison
          </h1>
          <div className="w-full md:w-72">
            <Select value={selectedAircraft?.key} onValueChange={handleAircraftSelect}>
              <SelectTrigger>
                <SelectValue placeholder="Select aircraft" />
              </SelectTrigger>
              <SelectContent>
                {aircraft.map(ac => (
                  <SelectItem key={ac} value={ac}>
                    {ac}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Selected Aircraft Section */}
        {selectedAircraft && (
          <div className="w-full max-w-3xl mx-auto">
            <div className="space-y-4">
              <div className="w-full">
                <div className="w-full aspect-[16/9]">
                  <AircraftImageCard
                    aircraft={selectedAircraft}
                    onClick={() => handleAircraftClick(selectedAircraft.key)}
                  />
                </div>
                <div className="flex justify-center mt-4">
                  <Button size="lg" onClick={() => handleAnalysis(selectedAircraft.key)}>
                    Analyze
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ranked Aircraft Grid */}
        {rankedAircraft && rankedAircraft.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {rankedAircraft.map((ra, index) => (
              <div key={ra.aircraft.key} className="flex flex-col gap-2">
                <AircraftImageCard
                  aircraft={ra.aircraft}
                  onClick={() => handleAircraftClick(ra.aircraft.key)}
                />
                <div className="flex items-center justify-between px-2">
                  <span className="text-sm font-medium">Rank {index + 1}</span>
                  <span className="text-sm font-semibold">Score: {ra.score.toFixed(1)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
