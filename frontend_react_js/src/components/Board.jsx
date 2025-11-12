import React from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board renders a 3x3 grid of squares and highlights a winning line when present.
 * @param {{squares: (('X'|'O'|null)[]), onPlay: (index:number)=>void, winningLine?: number[]}} props
 */
function Board({ squares, onPlay, winningLine = [] }) {
  const renderSquare = (i) => {
    const isWinning = winningLine.includes(i);
    return (
      <Square
        key={i}
        value={squares[i]}
        onClick={() => onPlay(i)}
        index={i}
        isWinning={isWinning}
      />
    );
  };

  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {[0, 1, 2].map((row) => (
        <div key={row} className="board-row" role="row">
          {[0, 1, 2].map((col) => {
            const idx = row * 3 + col;
            return renderSquare(idx);
          })}
        </div>
      ))}
    </div>
  );
}

export default Board;
