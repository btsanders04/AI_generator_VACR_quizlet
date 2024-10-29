import { getAircraft } from '@/app/lib/db-functions';
import AircraftInfo from '../../components/AircraftInfo';

export default async function AircraftPage({ params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name;
  const aircraft = await getAircraft(decodeURI(name));
  const serializedAircraft = JSON.parse(JSON.stringify(aircraft));
  if(!aircraft){
    return null;
  }
  return <AircraftInfo aircraft={serializedAircraft} />;
}
