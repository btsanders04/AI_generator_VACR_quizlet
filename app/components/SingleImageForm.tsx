'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Score from './Score';
import { getRandomAircraftImage } from '../lib/get-aircraft';
import { AircraftImageData } from '../types/aircraft';


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
      const correct =  !!currentImage.answers.find(value => inputValue.toLowerCase().trim() === value.toLowerCase().trim())
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
  }

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
            disabled={!inputValue.trim() || isLoading} 
          >
            Submit
          </button>
          <button
            type="button"
            onClick={handleSkip}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isLoading}
            className="flex-1 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Reset
          </button>
        </div>
      </form>

      <Score
        correctGuesses={correctGuesses}
        incorrectGuesses={incorrectGuesses}
      />

      {isCorrect !== null && !showAnswer && (
        <div className={`mt-4 p-2 rounded w-full text-center ${isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
        </div>
      )}
      {showAnswer && (
        <div className="mt-4 p-2 rounded w-full text-center bg-blue-100 text-blue-800">
          The correct answer was one of : {currentImage.answers.join(', ')}
        </div>
      )}
    </div>
  );
}