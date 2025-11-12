import { chooseAIMove } from './aiMove';

describe('chooseAIMove', () => {
  test('wins if possible', () => {
    // AI is 'X', board has X X _ in top row
    const board = [
      'X','X',null,
      null,'O',null,
      null,null,'O'
    ];
    const idx = chooseAIMove(board, 'X', 'O');
    expect(idx).toBe(2);
  });

  test('blocks opponent win if needed', () => {
    // Human 'X' threatens to win at index 2
    const board = [
      'X','X',null,
      null,'O',null,
      'O',null,null
    ];
    const idx = chooseAIMove(board, 'O', 'X');
    expect(idx).toBe(2);
  });

  test('takes center when no immediate win/block', () => {
    const board = [
      'X',null,null,
      null,null,null,
      null,null,'O'
    ];
    const idx = chooseAIMove(board, 'O', 'X');
    expect(idx).toBe(4);
  });

  test('takes a corner if center not available', () => {
    const board = [
      'X',null,null,
      null,'X',null,
      null,null,'O'
    ];
    // Center taken; expect a corner (0,2,6,8) that's empty => choose first available
    const idx = chooseAIMove(board, 'O', 'X');
    expect([0,2,6,8]).toContain(idx);
  });

  test('falls back to side if corners unavailable', () => {
    const board = [
      'X','X','O',
      null,'O',null,
      'O','O','X'
    ];
    // Only sides 3 or 5 available; expect one of them
    const idx = chooseAIMove(board, 'X', 'O');
    expect([3,5]).toContain(idx);
  });

  test('returns null if no moves', () => {
    const board = [
      'X','O','X',
      'X','O','O',
      'O','X','X'
    ];
    const idx = chooseAIMove(board, 'O', 'X');
    expect(idx).toBeNull();
  });
});
