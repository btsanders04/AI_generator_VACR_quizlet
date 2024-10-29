
import React, { useEffect, useState } from 'react';
import ImageCarousel from './ImageCarousel';
import { Aircraft } from '@/app/types/aircraft';
interface AircraftInfoProps {
  aircraft: Aircraft;
}

const AircraftInfo = ({ aircraft }: AircraftInfoProps) => {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">{aircraft.key}</h1>
            <ImageCarousel
                images={aircraft.imageUrls || []}
              />
        <h2 className="text-1xl text-center font-bold text-left text-black">General Data</h2>
        <div className="text-gray-600">
         {aircraft.generalData.map(item => (
          <p
          key={`general-${item.key}`}
          className="flex items-center gap-2 p-3 bg-gray-100  group transition-colors duration-200"
          >{item.key}: {item.value}</p>
         ))}
        </div>
        <h2 className="text-1xl text-center  font-bold text-left text-black">Weft Description</h2>
        <div className=" text-gray-600">
         {aircraft.weftDescription.map(item => (
          <p
          key={`weft-${item.key}`}
          className="flex items-center gap-2 p-3 bg-gray-100 group  transition-colors duration-200"
          >{item.key}: {item.value}</p>
         ))}
        </div>
      </div>
    </div>
  );
};

export default AircraftInfo;
