'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Score from './Score';
import { getRandomAircraftImage } from '../lib/get-aircraft';
import { AircraftImageData } from '../types/aircraft';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export default function SingleImageForm() {
  const [currentImage, setCurrentImage] = useState<AircraftImageData | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchRandomImage = async () => {
    try {
      const response = await getRandomAircraftImage();
      setCurrentImage(response);
    } catch (error) {
      console.error('Error fetching random image:', error);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentImage) {
      const correct = !!currentImage.answers.find(
        value => inputValue.toLowerCase().trim() === value.toLowerCase().trim()
      );
      setIsCorrect(correct);
      if (correct) {
        setCorrectGuesses(prev => prev + 1);
      } else {
        setIncorrectGuesses(prev => prev + 1);
      }
      setShowAnswer(true);
      handleNext();
    }
  };

  const handleSkip = () => {
    if (!isCorrect && !showAnswer) {
      setIncorrectGuesses(prev => prev + 1);
    }
    setShowAnswer(true);
    handleNext();
  };

  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setInputValue('');
      setIsCorrect(null);
      setShowAnswer(false);
      fetchRandomImage();
      setLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    setCorrectGuesses(0);
    setIncorrectGuesses(0);
    setInputValue('');
    setIsCorrect(null);
    setShowAnswer(false);
    setLoading(false);
    fetchRandomImage();
  };

  if (!currentImage) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <div className="w-full">
          <Image
            src={currentImage.url}
            alt="Random aircraft"
            width={400}
            height={300}
            layout="responsive"
            className="rounded-lg"
          />
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-4">
          <Input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="w-full"
            placeholder="Enter aircraft name"
          />
          <div className="flex gap-2 w-full">
            <Button
              type="submit"
              variant="default"
              disabled={!inputValue.trim() || isLoading}
              className="flex-1"
            >
              Submit
            </Button>
            <Button
              type="button"
              onClick={handleSkip}
              disabled={isLoading}
              variant="secondary"
              className="flex-1"
            >
              Skip
            </Button>
            <Button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              variant="destructive"
              className="flex-1"
            >
              Reset
            </Button>
          </div>
        </form>

        <Score correctGuesses={correctGuesses} incorrectGuesses={incorrectGuesses} />

        {isCorrect !== null && !showAnswer && (
          <Alert variant={isCorrect ? 'default' : 'destructive'} className="w-full">
            <div className="flex items-center gap-2">
              {isCorrect ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
              <AlertDescription>
                {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
              </AlertDescription>
            </div>
          </Alert>
        )}

        {showAnswer && (
          <Alert className="w-full">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              <AlertDescription>
                The correct answer was one of: {currentImage.answers.join(', ')}
              </AlertDescription>
            </div>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
