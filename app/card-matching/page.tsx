import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import CardMatching from '../components/CardMatching';
import Link from 'next/link';

export default function CardMatchingPage() {
  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <div className="flex min-h-screen flex-col items-center p-8">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mb-8 text-center">
          Aircraft Card Matching
        </h1>
        <CardMatching />
      </div>
    </div>
  );
}
