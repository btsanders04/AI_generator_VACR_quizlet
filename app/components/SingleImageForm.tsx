'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageData {
  url: string;
  answer: string;
}

export default function SingleImageForm() {
  const [currentImage, setCurrentImage] = useState<ImageData | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [correctGuesses, setCorrectGuesses] = useState(0);
  const [incorrectGuesses, setIncorrectGuesses] = useState(0);

  const fetchRandomImage = async () => {
    try {
      const response = await fetch('/api/images?count=single');
      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }
      const imageData = await response.json();
      setCurrentImage(imageData);
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
      const correct = inputValue.toLowerCase().trim() === currentImage.answer.toLowerCase();
      setIsCorrect(correct);
      if (correct) {
        setCorrectGuesses(prev => prev + 1);
      } else {
        setIncorrectGuesses(prev => prev + 1);
      }
    }
  };

  const handleNext = () => {
    if (!isCorrect) {
      setIncorrectGuesses(prev => prev + 1);
    }
    setInputValue('');
    setIsCorrect(null);
    setShowAnswer(false);
    fetchRandomImage();
  };

  const handleReset = () => {
    setCorrectGuesses(0);
    setIncorrectGuesses(0);
    setInputValue('');
    setIsCorrect(null);
    setShowAnswer(false);
    fetchRandomImage();
  };

  if (!currentImage) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4 text-black">
      <div className="flex items-start gap-4">
        <Image src={currentImage.url} alt="Random aircraft" width={400} height={300} />
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="text-lg font-bold mb-2">Score</h3>
          <div className="text-green-600">Correct: {correctGuesses}</div>
          <div className="text-red-600">Incorrect: {incorrectGuesses}</div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border border-gray-300 rounded px-2 py-1 text-black"
          placeholder="Enter aircraft name"
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className={`px-4 py-2 rounded ${
              inputValue.trim()
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!inputValue.trim()}
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Next
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </form>
      {isCorrect !== null && !showAnswer && (
        <div className={`mt-4 p-2 rounded ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
        </div>
      )}
      {showAnswer && (
        <div className="mt-4 p-2 rounded bg-blue-100 text-blue-800">
          The correct answer was: {currentImage.answer}
        </div>
      )}
    </div>
  );
}
