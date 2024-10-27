import Link from 'next/link';
import { getServerSession } from 'next-auth';
import LoginButton from './components/LoginButton';

export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-6xl flex justify-end mb-4">
        <LoginButton />
      </div>
      <h1 className="text-4xl font-bold mb-8">Aircraft Recognition Training</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link 
          href="/single-image-form" 
          className="p-6 border rounded-lg hover:bg-gray-100 transition-colors"
        >
          <h2 className="text-2xl font-bold mb-2">Single Image Training</h2>
          <p>Practice identifying aircraft from individual images</p>
        </Link>
        <Link 
          href="/answer-key" 
          className="p-6 border rounded-lg hover:bg-gray-100 transition-colors"
        >
          <h2 className="text-2xl font-bold mb-2">Answer Key</h2>
          <p>View all aircraft with their correct identifications</p>
        </Link>
        <Link 
          href="/card-matching" 
          className="p-6 border rounded-lg hover:bg-gray-100 transition-colors"
        >
          <h2 className="text-2xl font-bold mb-2">Card Matching Game</h2>
          <p>Test your memory by matching pairs of aircraft cards</p>
        </Link>
        {session && (
          <Link 
            href="/image-uploader" 
            className="p-6 border-2 border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <h2 className="text-2xl font-bold mb-2 text-blue-600">Image Management</h2>
            <p>Upload and organize aircraft images</p>
            <span className="inline-block mt-2 text-sm text-blue-600 font-medium">Administrative Tool</span>
          </Link>
        )}
      </div>
    </main>
  );
}
