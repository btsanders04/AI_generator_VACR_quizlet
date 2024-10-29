'use client';

import { useState, useEffect } from 'react';
import { Aircraft } from '@/app/types/aircraft';
import Image from 'next/image';
import { getAllAircraft } from '@/app/lib/get-aircraft';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Card {
  id: number;
  aircraft: Aircraft;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function CardMatching() {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = async () => {
    try {
      const allAircraft = await getAllAircraft();

      // Select 8 random aircraft names
      const selectedNames = [...allAircraft.map(ac => ac.key)]
        .sort(() => Math.random() - 0.5)
        .slice(0, 8);

      // Get corresponding aircraft data
      const selectedAircraft = selectedNames
        .map(name => allAircraft.find(aircraft => aircraft.key === name))
        .filter((aircraft): aircraft is Aircraft => aircraft !== undefined);

      // Create pairs of cards
      const cardPairs = [...selectedAircraft, ...selectedAircraft].map((aircraft, index) => ({
        id: index,
        aircraft,
        imageUrl: aircraft.imageUrls[0],
        isFlipped: false,
        isMatched: false,
      }));

      // Shuffle the cards
      setCards(cardPairs.sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error('Error loading aircraft data:', error);
    }
  };

  const handleCardClick = (id: number) => {
    // Prevent clicking if two cards are already flipped
    if (flippedCards.length === 2) return;

    // Prevent clicking already matched or flipped cards
    const clickedCard = cards.find(card => card.id === id);
    if (!clickedCard || clickedCard.isMatched || clickedCard.isFlipped) return;

    // Flip the card
    const updatedCards = cards.map(card => (card.id === id ? { ...card, isFlipped: true } : card));
    setCards(updatedCards);

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Check for match if two cards are flipped
    if (newFlippedCards.length === 2) {
      const [firstId, secondId] = newFlippedCards;
      const firstCard = updatedCards.find(card => card.id === firstId);
      const secondCard = updatedCards.find(card => card.id === secondId);

      if (firstCard && secondCard && firstCard.aircraft.key === secondCard.aircraft.key) {
        // Match found
        setTimeout(() => {
          setCards(
            cards.map(card =>
              card.id === firstId || card.id === secondId
                ? { ...card, isMatched: true, isFlipped: true }
                : card
            )
          );
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(
            cards.map(card =>
              card.id === firstId || card.id === secondId ? { ...card, isFlipped: false } : card
            )
          );
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl">
      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <Card
            key={card.id}
            className={`cursor-pointer transition-transform duration-500 perspective-1000 ${
              card.isMatched ? 'opacity-60' : ''
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <CardContent className="p-0 aspect-[3/4]">
              <div className="relative w-full h-full transform-style-3d transition-transform duration-500">
                {/* Card Front (Hidden) */}
                <div
                  className={`absolute w-full h-full bg-primary/10 flex items-center justify-center backface-hidden ${
                    card.isFlipped ? 'hidden' : ''
                  }`}
                >
                  <span className="text-primary text-2xl font-bold">?</span>
                </div>

                {/* Card Back (Aircraft) */}
                <div
                  className={`absolute w-full h-full bg-background p-4 backface-hidden ${
                    !card.isFlipped ? 'hidden' : ''
                  }`}
                >
                  <div className="text-center h-full flex flex-col">
                    <div className="relative flex-grow mb-2">
                      <Image
                        src={card.imageUrl}
                        alt={card.aircraft.key}
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{card.aircraft.key}</h3>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {matchedPairs === 8 && (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-green-600">
            Congratulations! You&#39;ve matched all pairs!
          </h2>
          <Button className="mt-4" onClick={initializeGame}>
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
}
