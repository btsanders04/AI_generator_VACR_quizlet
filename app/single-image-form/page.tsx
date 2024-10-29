import SingleImageForm from '../components/SingleImageForm';
import Link from 'next/link';
import { getAllAircraft } from '../lib/db-functions';

export default async function SingleImageFormPage() {
  const aircraft = await getAllAircraft();
  const serializedAircraft = JSON.parse(JSON.stringify(aircraft));
  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="inline-block mb-4 text-blue-600 hover:text-blue-800 underline">
        ← Back to Home
      </Link>
      <h1 className="text-2xl font-bold mb-4">VACR Practice Quiz</h1>
      <SingleImageForm aircraft={serializedAircraft}/>
    </div>
  );
}
