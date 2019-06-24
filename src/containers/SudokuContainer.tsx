import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { StoreState } from 'modules';
import { SudokuState, actionCreators, SudokuActionTypes, UpdateBoardPayload } from 'modules/sudoku';
import { Difficulty, Board } from 'services/sudoku.service';

import Grid from 'components/base/Grid';
import Gap from 'components/base/Gap';

type SudokuContainerProps = {
  sudoku: SudokuState;
  getBoard: (difficulty: Difficulty) => SudokuActionTypes;
  updateBoard: (payload: UpdateBoardPayload) => SudokuActionTypes;
  end: () => SudokuActionTypes;
};

type SudokuContainerState = {
  x: number;
  y: number;
};

const isPressedNumber = (pressed: String) => pressed.match(/^[1-9]*$/) ? true : false;

const getEmptyCellsCount = (board: Board) => {
  let count = 0;
  board.forEach(line => {
    line.forEach(cell => {
      if (cell === 0) count++;
    });
  });
  return count;
};

const Wrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  flex-basis: content;
  position: relative;
`;

class SudokuContainer extends React.Component<SudokuContainerProps, SudokuContainerState> {
  state = {
    x: 0,
    y: 0
  };

  difficultyRef = React.createRef<HTMLSelectElement>();

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
    const { sudoku } = this.props;
    return (
      <Wrapper>
        <Grid board={sudoku.board} selectedCell={this.state} onClick={this.handleClick} />
        <Gap top="1.5rem" />
        <div>
          난이도: 
          <select disabled={sudoku.status === 'unsolved'} ref={this.difficultyRef}>
            <option value="easy">쉬움</option>
            <option value="medium">보통</option>
            <option value="hard">어려움</option>
            <option value="random">랜덤</option>
          </select>
          <button disabled={sudoku.status === 'unsolved'} onClick={() => this.props.getBoard(this.difficultyRef.current!!.value as Difficulty)}>시작하기</button>
          <button disabled={sudoku.status === 'solved'} onClick={() => this.props.end()}>포기하기</button>
        </div>
        <Gap top="1.5rem" />
        <div>
          {
            sudoku.status === 'unsolved' ? `현재 ${getEmptyCellsCount(sudoku.board)} 개의 셀이 남았습니다.` : `게임 중이 아닙니다.`
          }
        </div>
        <Gap top="1.5rem" />
        <div>
          {
            sudoku.status === 'unsolved' && `실수 허용 횟수: ${3 - sudoku.failCount}`
          }
        </div>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({
  sudoku: state.sudoku
});

const dispatchToProps = {
  getBoard: actionCreators.getBoard,
  updateBoard: actionCreators.updateBoard,
  end: actionCreators.end
};

export default connect(mapStateToProps, dispatchToProps)(SudokuContainer);
