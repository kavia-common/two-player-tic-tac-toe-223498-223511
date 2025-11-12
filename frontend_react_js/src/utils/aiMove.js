 // PUBLIC_INTERFACE
 /**
  * chooseAIMove selects the best move for the AI based on a simple strategy:
  * 1) Try to win if possible.
  * 2) Block opponent's immediate win.
  * 3) Take center if available.
  * 4) Take a corner if available.
  * 5) Take a side.
  *
  * @param {Array<'X'|'O'|null>} squares - Current board
  * @param {'X'|'O'} aiMark - Mark used by AI
  * @param {'X'|'O'} humanMark - Mark used by human
  * @returns {number|null} index of selected move or null if no moves
  */
export function chooseAIMove(squares, aiMark, humanMark) {
  const empty = squares
    .map((v, i) => (v === null ? i : null))
    .filter((v) => v !== null);

  if (empty.length === 0) return null;

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

  const tryComplete = (mark) => {
    for (const [a, b, c] of lines) {
      const line = [a, b, c].map((idx) => squares[idx]);
      const countMark = line.filter((x) => x === mark).length;
      const countEmpty = line.filter((x) => x === null).length;
      if (countMark === 2 && countEmpty === 1) {
        const idx = [a, b, c].find((i) => squares[i] === null);
        if (idx !== undefined) return idx;
      }
    }
    return null;
  };

  // 1) Win
  const winning = tryComplete(aiMark);
  if (winning !== null) return winning;

  // 2) Block
  const block = tryComplete(humanMark);
  if (block !== null) return block;

  // 3) Center
  if (squares[4] === null) return 4;

  // 4) Corners
  const corners = [0, 2, 6, 8].filter((i) => squares[i] === null);
  if (corners.length > 0) return corners[0];

  // 5) Sides
  const sides = [1, 3, 5, 7].filter((i) => squares[i] === null);
  if (sides.length > 0) return sides[0];

  return empty[0] ?? null;
}
