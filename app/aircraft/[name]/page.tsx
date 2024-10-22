import React, { Usable } from 'react';
import AircraftInfo from '../../components/AircraftInfo';
import { getAircraftNames } from '../../services/fetchImage';

export default function AircraftPage({ params }: { params: Usable<{ name: string }> }) {
  const {name} = React.use<{name: string}>(params);
  return <AircraftInfo aircraft={decodeURIComponent(name)} />;
}

export function generateStaticParams() {
  const aircraftNames = getAircraftNames();
  return aircraftNames.map((name) => ({
    name: encodeURIComponent(name),
  }));
}
