import { call, spawn, put, takeEvery } from 'redux-saga/effects';
import { GET_BOARD, SudokuActionTypes, GetBoardAction, actionCreators } from 'modules/sudoku';
import { getBoard, solveBoard } from 'services/sudoku.service';

export function* fetchSudokuSaga(action: SudokuActionTypes) {
  try {
    const { board } = yield call(getBoard, (action as GetBoardAction).payload);
    console.log(board);
    const { solution } = yield call(solveBoard, board);
    yield put(actionCreators.setBoard({ board, solution }));
  }
  catch (err) {
    yield put(actionCreators.sagaGetBoardFailure(err));
  }
}

function* watchSudokuSaga() {
  yield takeEvery(GET_BOARD, fetchSudokuSaga);
}

export default function* rootSaga() {
  yield spawn(watchSudokuSaga);
}
