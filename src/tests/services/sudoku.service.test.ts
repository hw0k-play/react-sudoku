import { getBoard, solveBoard, validateBoard, BoardResponse, SolveResponse, ValidateResponse } from 'services/sudoku.service';

let board1: BoardResponse;
let board2: BoardResponse;
let solved1: SolveResponse;
let solved2: SolveResponse;
let validated1: ValidateResponse;
let validated2: ValidateResponse;

beforeAll(async () => {
  board1 = await getBoard('easy');
  solved1 = await solveBoard(board1.board);
  validated1 = await validateBoard(solved1.solution);

  board2 = await getBoard('easy');
  solved2 = await solveBoard(board2.board);
  validated2 = await validateBoard(solved2.solution);
});

describe('Sudoku service test', () => {
  it('Successfully generates board', () => {
    expect(board1).not.toBeNull();
    expect(board2).not.toBeNull();
  });
  it('Generates different board', () => {
    expect(board1).not.toEqual(board2);
  });
  it('Solves correctly', async () => {
    expect(validated1).toEqual({status: 'solved'});
    expect(validated2).toEqual({status: 'solved'});
  });
  it('Solved different', () => {
    expect(solved1).not.toEqual(solved2);
  });
});
