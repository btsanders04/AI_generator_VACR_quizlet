import SingleImageForm from '../components/SingleImageForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function SingleImageFormPage() {
  return (
    <div className="container relative mx-auto min-h-screen p-4">
      <div className="relative">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="flex flex-col items-center p-8">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mb-8 text-center">
            VACR Practice Quiz
          </h1>
          <SingleImageForm />
        </div>
      </div>
    </div>
  );
}
