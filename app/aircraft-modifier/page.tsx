import { getAllAircraft } from '@/app/lib/db-functions';
import AircraftModifierForm from '@/app/components/AircraftModifierForm';

export default async function AircraftModifierPage() {;
  const aircraft = await getAllAircraft();
  const serializedAircraft = JSON.parse(JSON.stringify(aircraft));
  return <AircraftModifierForm aircraftParams={serializedAircraft} />;
}
