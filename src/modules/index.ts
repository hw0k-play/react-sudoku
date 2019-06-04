import { combineReducers } from 'redux';
import { SudokuState, sudokuReducer as sudoku } from './sudoku';

export interface StoreState {
  sudoku: SudokuState;
}

export default combineReducers<StoreState>({
  sudoku
});
