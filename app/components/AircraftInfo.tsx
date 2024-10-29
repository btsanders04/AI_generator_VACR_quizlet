'use client';

import React, { useEffect, useState } from 'react';
import ImageCarousel from './ImageCarousel';
import { getAircraft } from '../lib/get-aircraft';
import { Aircraft } from '../types/aircraft';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-center">{aircraft}</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <ImageCarousel images={aircraftData?.imageurls || []} />

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">General Data</h2>
            <div className="grid gap-2">
              {aircraftData?.generalData.map(item => (
                <div
                  key={`general-${item.key}`}
                  className="flex items-center justify-between p-2 rounded-lg bg-secondary/20"
                >
                  <Badge variant="outline" className="font-semibold">
                    {item.key}
                  </Badge>
                  <span className="text-muted-foreground text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Weft Description</h2>
            <div className="grid gap-2">
              {aircraftData?.weftDescription.map(item => (
                <div
                  key={`weft-${item.key}`}
                  className="flex items-center justify-between p-2 rounded-lg bg-secondary/20"
                >
                  <Badge variant="outline" className="font-semibold">
                    {item.key}
                  </Badge>
                  <span className="text-muted-foreground text-right">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AircraftInfo;
