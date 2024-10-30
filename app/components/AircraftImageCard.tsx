import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Aircraft } from '../types/aircraft';
import ImageCarousel from './ImageCarousel';

interface AircraftImageCardProps {
  aircraft: Aircraft;
  onClick?: (value: string) => void;
}

const AircraftImageCard = ({ aircraft, onClick }: AircraftImageCardProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick(aircraft.key);
    }
  };
  return (
    <Card
      key={aircraft.key}
      onClick={() => handleClick()}
      className="cursor-pointer hover:bg-accent transition-colors"
    >
      <CardHeader className="p-4">
        <CardTitle className="text-xl">{aircraft.key}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ImageCarousel images={aircraft.imageurls || []} />
      </CardContent>
    </Card>
  );
};
export default AircraftImageCard;
