import { useState, useEffect } from 'react';
import Board from './Board';
import calculateWinner from '../../features/function/CalculateWinner';

const initialSquares = Array(9).fill(null);

export default function Game() {
  const [history, setHistory] = useState<(string | null)[][]>([initialSquares]);
  const [currentMove, setCurrentMove] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAI, setIsAI] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const currentSquares = history[currentMove];

  useEffect(() => {
    if (isAI && !xIsNext && !isGameOver) {
      const timeout = setTimeout(() => {
        makeAIMove();
      }, 200);

      return () => clearTimeout(timeout);
    }
  }, [xIsNext, isAI, isGameOver, currentSquares]);

  function handlePlay(nextSquares: (string | null)[]) {
    if (calculateWinner(nextSquares) || nextSquares.some(square => square === null)) {
      setHistory([...history.slice(0, currentMove + 1), nextSquares]);
      setCurrentMove(currentMove + 1);
      setXIsNext(!xIsNext);
      setIsGameOver(calculateWinner(nextSquares) !== null || nextSquares.every(square => square !== null));
    }
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
    setIsGameOver(calculateWinner(history[nextMove]) !== null || history[nextMove].every(square => square !== null));
  }

  function makeAIMove() {
    const emptyIndices = currentSquares.map((value, index) => value === null ? index : -1).filter(index => index !== -1);
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const nextSquares = [...currentSquares];
    nextSquares[randomIndex] = 'O';
    handlePlay(nextSquares);
  }

  const moves = history.map((_squares, move) => {
    const description = move > 0 ? `Pergi ke langkah #${move}` : 'Pergi ke awal permainan';
    return (
      <li key={move} className="mb-2">
        <button
          onClick={() => jumpTo(move)}
          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center p-4">
      <div className="flex flex-col items-center mb-4">
        <button
          onClick={() => setIsAI(prev => !prev)}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 mb-2"
        >
          {isAI ? 'Switch to Multiplayer' : 'Play Against AI'}
        </button>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info text-center">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
