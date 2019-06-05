import React from 'react';
import { connect } from 'react-redux';
import { SudokuState, actionCreators, SudokuActionTypes, UpdateBoardPayload } from 'modules/sudoku';
import { Difficulty } from 'services/sudoku.service';
import { StoreState } from 'modules';
import produce from 'immer';

import Grid from 'components/base/Grid';

type SudokuContainerProps = {
  sudoku: SudokuState;
  getBoard: (difficulty: Difficulty) => SudokuActionTypes;
  updateBoard: (payload: UpdateBoardPayload) => SudokuActionTypes;
};

class SudokuContainer extends React.Component<SudokuContainerProps, UpdateBoardPayload> {
  state = {
    x: 0,
    y: 0,
    value: 0
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>, str: string) => {
    this.setState(produce(this.state, draft => {
      if (str === 'x') {
        draft.x = parseInt(e.currentTarget.value);
      }
      if (str === 'y') {
        draft.y = parseInt(e.currentTarget.value);
      }
      if (str === 'value') {
        draft.value = parseInt(e.currentTarget.value);
      }
    }));
  };

  render() {
    const { x, y, value } = this.state;
    return (
      <div>
        <button onClick={() => this.props.getBoard('hard')}>받아오기</button>
        <br />
        <input type="text" value={this.state.x} onChange={(e) => this.handleChange(e, 'x')} />
        <input type="text" value={this.state.y} onChange={(e) => this.handleChange(e, 'y')} />
        <input type="text" value={this.state.value} onChange={(e) => this.handleChange(e, 'value')} />
        <button onClick={() => this.props.updateBoard({x, y, value})}>값 넣기</button>
        <br />
        <Grid board={this.props.sudoku.board} />
        {this.props.sudoku.status === 'solved' && <div>다 풀었어요!</div>}
      </div>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  sudoku: state.sudoku
});

const dispatchToProps = {
  getBoard: actionCreators.getBoard,
  updateBoard: actionCreators.updateBoard
};

export default connect(mapStateToProps, dispatchToProps)(SudokuContainer);
