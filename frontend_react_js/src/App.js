import React, { useEffect, useMemo, useState } from 'react';
import './index.css';
import './App.css';
import Board from './components/Board';
import { calculateWinner } from './utils/calculateWinner';
import { chooseAIMove } from './utils/aiMove';

/**
 * PUBLIC_INTERFACE
 * App (Game) is the top-level component managing Tic Tac Toe state and layout.
 * Handles the 3x3 grid, turn logic, status (turn/win/draw), and restart.
 * Now supports Single Player (vs AI) and Two Players modes.
 */
function App() {
  // Game state: 9 cells, each null | 'X' | 'O'
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [theme] = useState('light'); // fixed to light per requirements

  // Game mode state
  const [mode, setMode] = useState('two'); // 'single' | 'two'
  const [humanMark, setHumanMark] = useState('X'); // only relevant in single mode

  // Derived: aiMark
  const aiMark = useMemo(() => (humanMark === 'X' ? 'O' : 'X'), [humanMark]);

  // Apply light theme to document element (kept for potential future theming)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const { winner, line } = calculateWinner(squares);
  const movesLeft = squares.some((sq) => sq === null);
  const isDraw = !winner && !movesLeft;

  const currentTurnMark = isXNext ? 'X' : 'O';

  const status = winner
    ? `${winner} wins!`
    : isDraw
    ? 'Draw'
    : `${currentTurnMark}'s turn${mode === 'single' ? (currentTurnMark === humanMark ? ' (You)' : ' (AI)') : ''}`;

  /**
   * Make a move at index for current player (depending on isXNext).
   * Returns next board array if move applied, otherwise returns original.
   */
  const applyMove = (board, index) => {
    if (board[index] || winner) return board;
    const next = board.slice();
    next[index] = isXNext ? 'X' : 'O';
    return next;
  };

  /**
   * Handle a play on a given square index by human.
   * - Ignores clicks when the game is over or the square is already filled.
   * - Sets the symbol and toggles the turn.
   * - In single-player mode, triggers AI move if game not ended.
   */
  const handlePlay = (index) => {
    if (squares[index] || winner) return;

    // Human move
    const humanMoveNext = applyMove(squares, index);
    if (humanMoveNext === squares) return;

    setSquares(humanMoveNext);

    // After human move, compute next player
    const nextIsX = !isXNext;
    setIsXNext(nextIsX);

    // If single-player and game not finished, schedule AI move if it's AI's turn
    if (mode === 'single') {
      const { winner: wAfter, line: _ } = calculateWinner(humanMoveNext);
      const stillMoves = humanMoveNext.some((sq) => sq === null);

      const nextTurnMark = nextIsX ? 'X' : 'O';
      if (!wAfter && stillMoves && nextTurnMark === aiMark) {
        // Defer AI move slightly to ensure state is applied and provide UX feedback
        window.setTimeout(() => {
          performAIMove(humanMoveNext);
        }, 150);
      }
    }
  };

  /**
   * Execute the AI move if possible.
   * - Respects game end states
   * - Uses chooseAIMove utility
   */
  const performAIMove = (board) => {
    const { winner: w } = calculateWinner(board);
    if (w) return;

    const aiIndex = chooseAIMove(board, aiMark, humanMark);
    if (aiIndex === null) return;

    // AI moves based on whose turn matches aiMark
    const aiIsX = aiMark === 'X';

    const next = board.slice();
    next[aiIndex] = aiMark;

    setSquares(next);
    // Toggle turn to the other player after AI move
    setIsXNext(!aiIsX);
  };

  /**
   * PUBLIC_INTERFACE
   * Reset the game to initial state with X starting.
   * Keeps the current mode and humanMark selection.
   */
  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  // When switching modes or changing human mark, restart the game for clarity
  const handleModeChange = (e) => {
    const value = e.target.value;
    setMode(value);
    // fresh board on mode switch
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const handleHumanMarkChange = (e) => {
    const value = e.target.value;
    if (value !== 'X' && value !== 'O') return;
    setHumanMark(value);
    // fresh board on mark switch
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  // Auto-play AI if user selected to be 'O' and the board is new (AI starts as X)
  useEffect(() => {
    if (mode !== 'single') return;
    const emptyBoard = squares.every((sq) => sq === null);
    if (emptyBoard && humanMark === 'O') {
      // AI (X) should start
      window.setTimeout(() => {
        performAIMove(squares);
      }, 150);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, humanMark]);

  return (
    <div className="game-app">
      <main className="game-container" role="application" aria-label="Tic Tac Toe game">
        <h1 className="game-title" aria-live="polite">{status}</h1>

        {/* Controls */}
        <div
          className="controls"
          style={{
            display: 'grid',
            gap: 10,
            justifyItems: 'center',
            marginBottom: 12
          }}
        >
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
            <label htmlFor="mode">Mode:</label>
            <select
              id="mode"
              value={mode}
              onChange={handleModeChange}
              aria-label="Select game mode"
              style={{ padding: '6px 8px', borderRadius: 8, border: '1px solid rgba(100,116,139,0.35)' }}
            >
              <option value="single">Single Player</option>
              <option value="two">Two Players</option>
            </select>
          </div>

          {mode === 'single' && (
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
              <span>You're playing as:</span>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="radio"
                  name="humanMark"
                  value="X"
                  checked={humanMark === 'X'}
                  onChange={handleHumanMarkChange}
                />
                X
              </label>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <input
                  type="radio"
                  name="humanMark"
                  value="O"
                  checked={humanMark === 'O'}
                  onChange={handleHumanMarkChange}
                />
                O
              </label>
            </div>
          )}
        </div>

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
