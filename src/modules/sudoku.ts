import { Board, Difficulty, Status } from 'services/sudoku.service';
import produce from 'immer';

export const START = 'sudoku/START';
export const END = 'sudoku/END';
export const GET_BOARD = 'sudoku/GET_BOARD';
export const SET_BOARD = 'sudoku/SET_BOARD';
export const UPDATE_BOARD = 'sudoku/UPDATE_BOARD';

export const SAGA__GET_BOARD_FAILURE = 'sudoku/saga/GET_BOARD_FAILURE';

export type UpdateBoardPayload = {
  x: number,
  y: number,
  value: number
};

export type SetBoardPayload = {
  board: Board,
  solution: Board
};

interface StartAction {
  type: typeof START;
}

interface EndAction {
  type: typeof END;
}

export interface GetBoardAction {
  type: typeof GET_BOARD;
  payload: Difficulty;
}

interface SetBoardAction {
  type: typeof SET_BOARD;
  payload: SetBoardPayload;
}

interface UpdateBoardAction {
  type: typeof UPDATE_BOARD;
  payload: UpdateBoardPayload;
}

interface SagaGetBoardFailureAction {
  type: typeof SAGA__GET_BOARD_FAILURE;
  error: Error;
}

export type SudokuActionTypes = 
  StartAction |
  EndAction |
  GetBoardAction |
  SetBoardAction |
  UpdateBoardAction |
  SagaGetBoardFailureAction;

const start = (): SudokuActionTypes => {
  return {
    type: START
  };
};

const end = (): SudokuActionTypes => {
  return {
    type: END
  };
};

const getBoard = (difficulty: Difficulty): SudokuActionTypes => {
  return {
    type: GET_BOARD,
    payload: difficulty
  };
};

const setBoard = (payload: SetBoardPayload): SudokuActionTypes => {
  return {
    type: SET_BOARD,
    payload
  };
};

const updateBoard = (payload: UpdateBoardPayload): SudokuActionTypes => {
  return {
    type: UPDATE_BOARD,
    payload
  };
};

const sagaGetBoardFailure = (error: Error): SudokuActionTypes => {
  return {
    type: SAGA__GET_BOARD_FAILURE,
    error
  };
};

export const actionCreators = { start, end, getBoard, setBoard, updateBoard, sagaGetBoardFailure };

const getEmptyBoard: (() => Board) = () => new Array(9).fill(0).map(() => new Array(9).fill(0)) as Board;

export interface SudokuState {
  status: Status,
  board: Board,
  origin: Board,
  solution: Board,
  failCount: number,
  error?: Error
}

const initialState: SudokuState = {
  status: 'solved',
  board: getEmptyBoard(),
  origin: getEmptyBoard(),
  solution: getEmptyBoard(),
  failCount: 0
};

export function sudokuReducer(state = initialState, action: SudokuActionTypes) {
  return produce(state, draft => {
    switch (action.type) {
      case START:
        draft.status = 'unsolved';
        draft.failCount = 0;
        break;

      case END:
        alert('클리어하지 못했습니다.');
        draft.status = 'solved';
        draft.board = getEmptyBoard();
        draft.origin = getEmptyBoard();
        draft.solution = getEmptyBoard();
        draft.failCount = 0;
        break;

      case SET_BOARD:
        const { board, solution } = action.payload;
        draft.board = board;
        draft.origin = board;
        draft.solution = solution;
        break;
        
      case UPDATE_BOARD:
        if (state.status === 'solved') {
          break;
        }
        const { x, y, value } = action.payload;

        if (state.origin[x][y] !== 0) {
          break;
        }

        if (state.board[x][y] !== 0) {
          break;
        }

        if (state.solution[x][y] !== value) {
          alert('오답입니다!');
          draft.failCount += 1;
          break;
        }

        draft.board[x][y] = value;

        if (draft.board.toString() === draft.solution.toString()) {
          draft.status = 'solved';
          alert('클리어 성공!');
        }
        break;

      case SAGA__GET_BOARD_FAILURE:
        draft.error = action.error;
        break;

      default:
        break;
    }
  });
};
