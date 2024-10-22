import AircraftInfo from '../../components/AircraftInfo';
import { getAircraftNames } from '../../services/fetchImage';

function getAircraftName(aircraft: string): string | undefined {
  return getAircraftNames().find(name => name === aircraft);
}
export default async function AircraftPage({ params }: {params: Promise<{name: string}>}) {
  const name = (await params).name;
  const aircraft = getAircraftName(decodeURIComponent(name));
  if(!aircraft){
    return;
  }
  return <AircraftInfo aircraft={decodeURIComponent(aircraft)} />;
}

export async function generateMetadata({ params }: {params: Promise<{name: string}>}) {
  const name = (await params).name;
  const aircraft = getAircraftName(name);
  return {
    title: aircraft ? `Aircraft: ${aircraft}` : 'Aircraft Not Found'
  }
}


export function generateStaticParams() {
  const aircraftNames = getAircraftNames();
  return aircraftNames.map((name) => ({
    name: encodeURIComponent(name)
  }));
}
