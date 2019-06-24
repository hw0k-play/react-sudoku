import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Loading from 'react-loading';
import { StoreState } from 'modules';
import { SudokuState, actionCreators, SudokuActionTypes, UpdateBoardPayload } from 'modules/sudoku';
import { Difficulty, Board } from 'services/sudoku.service';

import Grid from 'components/base/Grid';
import Gap from 'components/base/Gap';
import Stat from 'components/base/Stat';
import Select from 'components/base/Select';
import Button from 'components/base/Button';

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

const StatWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  font-weight: bolder;
`;

const DifficultyWrapper = styled.div`
  font-weight: bolder;
  margin-bottom: 1rem;
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
        <Gap top="4.5rem" />
        <HeaderWrapper>
          React Sudoku
        </HeaderWrapper>
        <Gap top="1.5rem" />
        <StatWrapper>
          <Stat title="남은 셀 갯수" value={`${sudoku.status === 'unsolved' ? getEmptyCellsCount(sudoku.board) : '-'}`} suffix=" / 81" />
          {
            sudoku.loading && <Loading type="bars" color="#000" />
          }
          <Stat title="실수 허용 횟수" value={`${sudoku.status === 'unsolved' ? 3 - sudoku.failCount : '-'}`} suffix=" / 3" />
        </StatWrapper>
        <Gap top="1.5rem" />
        <Grid board={sudoku.board} selectedCell={this.state} onClick={this.handleClick} />
        <Gap top="1.5rem" />
        <StatWrapper>
          <div>
            <DifficultyWrapper>난이도</DifficultyWrapper>
            <Select disabled={sudoku.status === 'unsolved'} ref={this.difficultyRef}>
              <option value="easy">쉬움</option>
              <option value="medium">보통</option>
              <option value="hard">어려움</option>
              <option value="random">랜덤</option>
          </Select>
          </div>
          <div style={{display: 'flex', flexFlow: 'row nowrap'}}>
            <Button disabled={sudoku.status === 'unsolved'} onClick={() => this.props.getBoard(this.difficultyRef.current!!.value as Difficulty)}>시작하기</Button>
            <Gap right="1rem" />
            <Button disabled={sudoku.status === 'solved'} onClick={() => this.props.end()}>포기하기</Button>
          </div>
        </StatWrapper>
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
