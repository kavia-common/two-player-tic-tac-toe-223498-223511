import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Square renders an accessible button for a single board cell.
 * Supports keyboard (Enter/Space) and applies focus/hover styles.
 * @param {{ value: 'X' | 'O' | null, onClick: ()=>void, index:number, isWinning?: boolean }} props
 */
function Square({ value, onClick, index, isWinning = false }) {
  const label = `Square ${index + 1}${value ? `, ${value}` : ''}`;

  const handleKeyDown = (e) => {
    // Space or Enter activate the square
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`square${isWinning ? ' square-winning' : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label={label}
      role="gridcell"
    >
      <span className="square-value" aria-hidden="true">{value}</span>
    </button>
  );
}

export default Square;
