import React from 'react';

interface ScoreProps {
  correctGuesses: number;
  incorrectGuesses: number;
}

const Score: React.FC<ScoreProps> = ({ correctGuesses, incorrectGuesses }) => {
  return (
      <div className="w-full bg-gray-100 p-4 rounded mt-4">
        <h3 className="text-lg font-bold mb-2">Score</h3>
        <div className="flex justify-between">
          <div className="text-green-600">Correct: {correctGuesses}</div>
          <div className="text-red-600">Incorrect: {incorrectGuesses}</div>
        </div>
      </div>
  );
};

export default Score;
