import AnswerKey from '../components/AnswerKey';
import { getAllAircraft } from '@/app/lib/db-functions';

export default async function AnswerKeyPage() {
  const aircraft = await getAllAircraft();
  const serializedAircraft = JSON.parse(JSON.stringify(aircraft));
  return <AnswerKey aircraft={serializedAircraft} />;
}
