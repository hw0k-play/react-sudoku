import React from 'react';
import { connect } from 'react-redux';
import { StoreState } from 'modules';
import { SudokuState, actionCreators, SudokuActionTypes, UpdateBoardPayload } from 'modules/sudoku';
import { Difficulty } from 'services/sudoku.service';

import Grid from 'components/base/Grid';

type SudokuContainerProps = {
  sudoku: SudokuState;
  getBoard: (difficulty: Difficulty) => SudokuActionTypes;
  updateBoard: (payload: UpdateBoardPayload) => SudokuActionTypes;
};

type SudokuContainerState = {
  x: number;
  y: number;
};

const isPressedNumber = (pressed: String) => pressed.match(/^[1-9]*$/) ? true : false;

class SudokuContainer extends React.Component<SudokuContainerProps, SudokuContainerState> {
  state = {
    x: 0,
    y: 0
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }
  
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  handleClick = (selected: SudokuContainerState) => {
    this.setState(selected);
  };

  handleKeyPress = (event: KeyboardEvent) => {
    if (!isPressedNumber(event.key)) return;
    this.props.updateBoard({x: this.state.x, y: this.state.y, value: parseInt(event.key)});
  };

  render() {
    return (
      <div>
        <button onClick={() => this.props.getBoard('easy')}>받아오기</button>
        <Grid board={this.props.sudoku.board} selectedCell={this.state} onClick={this.handleClick} />
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
