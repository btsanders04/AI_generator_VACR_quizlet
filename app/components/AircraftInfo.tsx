'use client';

import React, { useEffect, useState } from 'react';
import ImageCarousel from './ImageCarousel';
import { getAircraft } from '../lib/get-aircraft';
import { Aircraft } from '../types/aircraft';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>General Data</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Weft Description</AccordionTrigger>
              <AccordionContent>
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {aircraftData?.isabel && (
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Wings</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {Object.entries(aircraftData.isabel.wings).map(([key, value]) => (
                      <div
                        key={`wings-${key}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary/20"
                      >
                        <Badge variant="outline" className="font-semibold">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Badge>
                        <span className="text-muted-foreground text-right">
                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Engine</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {Object.entries(aircraftData.isabel.engine).map(([key, value]) => (
                      <div
                        key={`engine-${key}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary/20"
                      >
                        <Badge variant="outline" className="font-semibold">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Badge>
                        <span className="text-muted-foreground text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Fuselage</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {Object.entries(aircraftData.isabel.fuselage).map(([key, value]) => (
                      <div
                        key={`fuselage-${key}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary/20"
                      >
                        <Badge variant="outline" className="font-semibold">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Badge>
                        <span className="text-muted-foreground text-right">
                          {Array.isArray(value) ? value.join(', ') : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Tail</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {Object.entries(aircraftData.isabel.tail).map(([key, value]) => (
                      <div
                        key={`tail-${key}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary/20"
                      >
                        <Badge variant="outline" className="font-semibold">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Badge>
                        <span className="text-muted-foreground text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Dimensions</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {Object.entries(aircraftData.isabel.dimensions).map(([key, value]) => (
                      <div
                        key={`dimensions-${key}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary/20"
                      >
                        <Badge variant="outline" className="font-semibold">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Badge>
                        <span className="text-muted-foreground text-right">{value} m</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Role Data</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {Object.entries(aircraftData.isabel.roleData).map(([key, value]) => (
                      <div
                        key={`role-${key}`}
                        className="flex items-center justify-between p-2 rounded-lg bg-secondary/20"
                      >
                        <Badge variant="outline" className="font-semibold">
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </Badge>
                        <span className="text-muted-foreground text-right">{value || 'N/A'}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AircraftInfo;
