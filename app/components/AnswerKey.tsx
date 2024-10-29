import { Aircraft } from '@/app/types/aircraft';
import ImageCarousel from './ImageCarousel';
import Link from 'next/link';
interface AnswerKeyProps {
  aircraft: Aircraft[];
}

export default function AnswerKey({aircraft}: AnswerKeyProps) {

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Aircraft Answer Key</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aircraft.map(ac => (
          <Link
            key={ac.key}
            href={`/aircraft/${ac.key}`}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-4">{ac.key}</h2>
            <ImageCarousel images={ac.imageUrls || []} />
          </Link>
        ))}
      </div>
    </div>
  );
}
