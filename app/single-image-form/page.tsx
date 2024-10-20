import SingleImageForm from '../components/SingleImageForm';
import Link from 'next/link';

export default function SingleImageFormPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">VACR Practice Quiz</h1>
      <SingleImageForm />
      <div className="mt-8">
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
