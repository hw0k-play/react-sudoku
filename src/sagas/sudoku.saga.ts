import { call, spawn, put, takeEvery, all, select } from 'redux-saga/effects';
import { GET_BOARD, UPDATE_BOARD, SudokuActionTypes, GetBoardAction, actionCreators } from 'modules/sudoku';
import { getBoard, solveBoard } from 'services/sudoku.service';

export function* fetchSudokuSaga(action: SudokuActionTypes) {
  try {
    const { board } = yield call(getBoard, (action as GetBoardAction).payload);
    const { solution } = yield call(solveBoard, board);
    yield put(actionCreators.setBoard({ board, solution }));
    yield put(actionCreators.start());
  }
  catch (err) {
    yield put(actionCreators.sagaGetBoardFailure(err));
  }
}

function* watchSudokuSaga() {
  yield takeEvery(GET_BOARD, fetchSudokuSaga);
}

export function* execFailSaga(action: SudokuActionTypes) {
  const { failCount } = yield select(state => state.sudoku);
  if (failCount === 3) {
    yield put(actionCreators.end());
  }
}

function* watchFailSaga() {
  yield takeEvery(UPDATE_BOARD, execFailSaga);
}

export default function* rootSaga() {
  yield all([spawn(watchSudokuSaga), spawn(watchFailSaga)]);
}
