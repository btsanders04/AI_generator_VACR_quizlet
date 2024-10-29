// components/AdminSection.tsx
'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminSection() {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'admin';

  if (!isAdmin) return null;

  return (
    <Link href="/image-uploader" className="block">
      <Card className="h-full hover:bg-muted/50 transition-colors border-primary">
        <CardHeader>
          <CardTitle className="text-primary">Image Management</CardTitle>
          <CardDescription>Upload and organize aircraft images</CardDescription>
        </CardHeader>
        <CardFooter>
          <Badge variant="outline" className="text-primary border-primary">
            Administrative Tool
          </Badge>
        </CardFooter>
      </Card>
    </Link>
  );
}
