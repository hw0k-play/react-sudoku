import axios from 'axios';
import qs from 'qs';

const baseURI: string = 'https://sugoku.herokuapp.com';

type Difficulty = 'easy' | 'medium' | 'hard' | 'random';
type Board = Array<Array<number>>;

const convertBoardToString = (board: Board): string => {
  let elementArray: Array<string> = [];

  board.forEach(element => elementArray.push(`[${element.join(',')}]`));
  return `[${elementArray.join(',')}]`;
};

export const getBoard = async (difficulty: Difficulty) => {
  try {
    const { data } = await axios.get(`${baseURI}/board?difficulty=${difficulty}`);
    return data;
  }
  catch (err) {
    console.error('An API Error occured.');
    console.error(err);
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
    console.error('An API Error occured.');
    console.error(err);
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
    console.error('An API Error occured.');
    console.error(err);
  }
};
