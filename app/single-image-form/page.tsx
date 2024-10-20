import SingleImageForm from '../components/SingleImageForm';
import Link from 'next/link';

export default function SingleImageFormPage() {
  return (
    <div className="container mx-auto p-4">
      <Link href="/" className="inline-block mb-4 text-blue-600 hover:text-blue-800 underline">
        ← Back to Home
      </Link>
      <h1 className="text-2xl font-bold mb-4">VACR Practice Quiz</h1>
      <SingleImageForm />
    </div>
  );
}
