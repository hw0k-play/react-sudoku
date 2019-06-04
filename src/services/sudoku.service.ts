import axios from 'axios';
import qs from 'qs';

const baseURI: string = 'https://sugoku.herokuapp.com';

type Tuple9<T> = [T, T, T, T, T, T, T, T, T];

export type Board = Tuple9<Tuple9<number>>;

export type Difficulty = 'easy' | 'medium' | 'hard' | 'random';
export type Status = 'solved' | 'unsolved';

export type BoardResponse = {
  board: Board;
};

export type SolveResponse = {
  difficulty: Difficulty;
  status: Status;
  solution: Board;
};

export type ValidateResponse = {
  status: Status;
};

const convertBoardToString = (board: Board): string => {
  let elementArray: Array<string> = [];

  board.forEach(element => elementArray.push(`[${element.join(',')}]`));
  return `[${elementArray.join(',')}]`;
};

const handleAPIError = (err: Error) => {
  console.error('An API Error occured.');
  console.error(err);
};

export const getBoard = async (difficulty: Difficulty) => {
  try {
    const { data } = await axios.get(`${baseURI}/board?difficulty=${difficulty}`);
    return data;
  }
  catch (err) {
    handleAPIError(err);
  }
};

export const solveBoard = async (board: Board) => {
  try {
    const { data } = await axios.post(`${baseURI}/solve`, qs.stringify({board: convertBoardToString(board)}), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return data;
  }
  catch (err) {
    handleAPIError(err);
  }
};

export const validateBoard = async (board: Board) => {
  try {
    const { data } = await axios.post(`${baseURI}/validate`, qs.stringify({board: convertBoardToString(board)}), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return data;
  }
  catch (err) {
    handleAPIError(err);
  }
};
