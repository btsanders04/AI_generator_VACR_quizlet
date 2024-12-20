import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import AnswerKey from '../components/AnswerKey';

export default function AnswerKeyPage() {
  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <AnswerKey />
    </div>
  );
}
