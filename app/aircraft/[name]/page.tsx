import AircraftInfo from '../../components/AircraftInfo';

export default async function AircraftPage({ params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name;
  return <AircraftInfo aircraft={decodeURIComponent(name)} />;
}
