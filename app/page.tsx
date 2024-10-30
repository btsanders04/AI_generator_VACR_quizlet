import Link from 'next/link';
import LoginButton from './components/LoginButton';
import AdminSection from './components/AdminSection';
import { ModeToggle } from './components/ModeToggle';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default async function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center p-8">
      <div className="relative z-10 w-full">
        <div className="w-full max-w-12xl flex justify-between mb-8">
          <div />
          <div className="flex items-center gap-4">
            <LoginButton />
            <ModeToggle />
          </div>
        </div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight mb-8 text-center">
          Aircraft Recognition Training
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
          <Link href="/single-image-form" className="block">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>Single Image Training</CardTitle>
                <CardDescription>
                  Practice identifying aircraft from individual images
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/answer-key" className="block">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>Answer Key</CardTitle>
                <CardDescription>
                  View all aircraft with their correct identifications
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/card-matching" className="block">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>Card Matching Game</CardTitle>
                <CardDescription>
                  Test your memory by matching pairs of aircraft cards
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/isabel-comparison" className="block">
            <Card className="h-full hover:bg-muted/50 transition-colors">
              <CardHeader>
                <CardTitle>Aircraft Comparison</CardTitle>
                <CardDescription>Intelligent Rank Analysis of Aircraft</CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <AdminSection />
        </div>
      </div>
    </main>
  );
}
