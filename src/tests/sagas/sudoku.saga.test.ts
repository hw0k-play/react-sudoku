import { testSaga } from 'redux-saga-test-plan';

import { fetchSudokuSaga } from 'sagas/sudoku.saga';
import { getBoard } from 'services/sudoku.service';

describe('Sudoku Saga test', () => {
  test('Should fetch sudoku board well', () => {
    let saga = testSaga(fetchSudokuSaga, { type: 'sudoku/GET_BOARD', payload: 'easy' });
    saga.next().call(getBoard, 'easy');
    saga.next();
    saga.next().isDone();
  });

  test('Should throw error', () => {
    let saga = testSaga(fetchSudokuSaga, { type: 'sudoku/GET_BOARD', payload: 'easy' });
    saga.next().call(getBoard, 'easy');
    saga.throw(new Error('test'));
    saga.next().isDone();
  });
});
