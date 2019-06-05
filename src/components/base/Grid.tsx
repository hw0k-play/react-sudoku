import React from 'react';

import styled from 'styled-components';

import { Board } from 'services/sudoku.service';

type WrapperProps = {
  size: number
};

const Wrapper = styled.div`
  display: inline-grid;
  grid-template-columns: ${(props: WrapperProps) => `repeat(${props.size}, 1fr)`};
  grid-template-rows: ${(props: WrapperProps) => `repeat(${props.size}, 1fr)`};
  justify-content: center;
  align-items: center;

  div {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.line-horizont {
      border-bottom: 1px solid black;
    }
    &.line-vert {
      border-right: 1px solid black;
    }
  }
`;

type GridProps = {
  board: Board
};

const lineClassName = (i: number, j: number) => {
  if (i % 3 === 2 && j % 3 === 2) {
    if (i === 8 && j === 8) return '';
    if (i === 8) return 'line-vert';
    if (j === 8) return 'line-horizont';
    return 'line-horizont line-vert';
  }
  if (i % 3 === 2) {
    if (i === 8) return '';
    return 'line-horizont';
  }
  if (j % 3 === 2) {
    if (j === 8) return '';
    return 'line-vert';
  }
};

const Grid: React.SFC<GridProps> = (props) => {
  const cells = props.board.map((line, i) => 
    line.map((cell, j) => (
      <div key={i * 10 + j} className={lineClassName(i, j)}>{(cell === 0 ? '' : cell)}</div>
    ))
  );
  return (
    <Wrapper size={9}>
      {cells}
    </Wrapper>
  );
};

export default Grid;
