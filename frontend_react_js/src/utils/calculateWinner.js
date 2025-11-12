 /**
  * PUBLIC_INTERFACE
  * Calculate the winner of a Tic Tac Toe board.
  * Returns an object with the winner symbol ('X' | 'O' | null) and the winning line indices.
  * @param {(Array<'X'|'O'|null>)} squares - The current 9-length board state.
  * @returns {{ winner: 'X' | 'O' | null, line: number[] }}
  */
export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: [] };
}
