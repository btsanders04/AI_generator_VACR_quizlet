'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getRandomImage } from '../services/fetchImage';

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
      const response = getRandomImage();
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
      const correct = inputValue.toLowerCase().trim() === currentImage.answer.toLowerCase();
      setIsCorrect(correct);
      if (correct) {
        setCorrectGuesses(prev => prev + 1);
      } else {
        setIncorrectGuesses(prev => prev + 1);
      }
      setShowAnswer(true);
    }
  };

  const handleNext = () => {
    if (!isCorrect && !showAnswer) {
      setIncorrectGuesses(prev => prev + 1);
    }
    setShowAnswer(true);
    setTimeout(() => {
      setInputValue('');
      setIsCorrect(null);
      setShowAnswer(false);
      fetchRandomImage();
    }, 2000);
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
    <div className="flex flex-col items-center gap-4 text-black p-4 max-w-md mx-auto">
      <div className="w-full">
        <Image 
          src={currentImage.url} 
          alt="Random aircraft" 
          width={400} 
          height={300} 
          layout="responsive"
        />
      </div>
      
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-black"
          placeholder="Enter aircraft name"
        />
        <div className="flex gap-2 w-full">
          <button
            type="submit"
            className={`flex-1 px-4 py-2 rounded ${
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
            className="flex-1 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Next
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </form>

      <div className="w-full bg-gray-100 p-4 rounded mt-4">
        <h3 className="text-lg font-bold mb-2">Score</h3>
        <div className="flex justify-between">
          <div className="text-green-600">Correct: {correctGuesses}</div>
          <div className="text-red-600">Incorrect: {incorrectGuesses}</div>
        </div>
      </div>

      {isCorrect !== null && !showAnswer && (
        <div className={`mt-4 p-2 rounded w-full text-center ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
        </div>
      )}
      {showAnswer && (
        <div className="mt-4 p-2 rounded w-full text-center bg-blue-100 text-blue-800">
          The correct answer was: {currentImage.answer}
        </div>
      )}
    </div>
  );
}