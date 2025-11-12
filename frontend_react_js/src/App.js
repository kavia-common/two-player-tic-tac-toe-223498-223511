import React, { useEffect, useState } from 'react';
import './index.css';
import './App.css';
import Board from './components/Board';
import { calculateWinner } from './utils/calculateWinner';

/**
 * PUBLIC_INTERFACE
 * App (Game) is the top-level component managing Tic Tac Toe state and layout.
 * Handles the 3x3 grid, turn logic, status (turn/win/draw), and restart.
 */
function App() {
  // Game state: 9 cells, each null | 'X' | 'O'
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [theme] = useState('light'); // fixed to light per requirements

  // Apply light theme to document element (kept for potential future theming)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const { winner, line } = calculateWinner(squares);
  const movesLeft = squares.some((sq) => sq === null);
  const isDraw = !winner && !movesLeft;

  const status = winner
    ? `${winner} wins!`
    : isDraw
    ? 'Draw'
    : `${isXNext ? "X" : "O"}'s turn`;

  /**
   * Handle a play on a given square index.
   * - Ignores clicks when the game is over or the square is already filled.
   * - Otherwise sets the symbol and toggles the turn.
   */
  const handlePlay = (index) => {
    if (squares[index] || winner) return;
    const next = squares.slice();
    next[index] = isXNext ? 'X' : 'O';
    setSquares(next);
    setIsXNext((prev) => !prev);
  };

  /**
   * PUBLIC_INTERFACE
   * Reset the game to initial state with X starting.
   */
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game-app">
      <main className="game-container" role="application" aria-label="Tic Tac Toe game">
        <h1 className="game-title" aria-live="polite">{status}</h1>

        <Board
          squares={squares}
          onPlay={handlePlay}
          winningLine={line}
        />

        <button
          type="button"
          className="restart-btn"
          onClick={handleRestart}
          aria-label="Restart game"
        >
          Restart
        </button>
      </main>
      <footer className="sr-only" aria-hidden="true">
        Tic Tac Toe game. Use keyboard tab to focus a square. Press Enter or Space to mark your move.
      </footer>
    </div>
  );
}

export default App;
