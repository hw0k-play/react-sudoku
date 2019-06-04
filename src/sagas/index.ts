import { all } from 'redux-saga/effects';
import sudokuSaga from './sudoku.saga';

export default function* entrySaga() {
  yield all([sudokuSaga()]);
}
