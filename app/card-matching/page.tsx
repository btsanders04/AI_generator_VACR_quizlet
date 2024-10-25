import CardMatching from '../components/CardMatching';

export default function CardMatchingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Aircraft Card Matching Game</h1>
      <CardMatching />
    </main>
  );
}
