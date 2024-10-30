'use client';

import IsabelComparison from '@/app/components/IsabelComparison';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function IsabelComparisonPage() {
  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" asChild className="mb-4">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </Button>
      <IsabelComparison />
    </div>
  );
}
