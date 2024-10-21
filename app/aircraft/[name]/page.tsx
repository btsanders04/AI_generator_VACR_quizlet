import AircraftInfo from '../../components/AircraftInfo';
import { getAircraftNames } from '../../services/fetchImage';

export default function AircraftPage({ params }: { params: { name: string } }) {
  return <AircraftInfo aircraft={decodeURIComponent(params.name)} />;
}

export function generateStaticParams() {
  const aircraftNames = getAircraftNames();
  return aircraftNames.map((name) => ({
    name: encodeURIComponent(name),
  }));
}
