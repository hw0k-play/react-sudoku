import React from 'react';

import styled from 'styled-components';

import { Board } from 'services/sudoku.service';
import Cell from './Cell';

type WrapperProps = {
  size: number;
};

const Wrapper = styled.div`
  display: inline-grid;
  grid-template-columns: ${(props: WrapperProps) => `repeat(${props.size}, 1fr)`};
  grid-template-rows: ${(props: WrapperProps) => `repeat(${props.size}, 1fr)`};
  grid-gap: 1px;
  border: 1px solid var(--oc-gray-9);
  justify-content: center;
  align-items: center;
`;

export type CellSelectProps = {
  x: number;
  y: number;
}

type GridProps = {
  board: Board;
  selectedCell: CellSelectProps;
  onClick: (props: CellSelectProps) => void;
};

const isBetween = (target: number, min: number, max: number) => target >= min && target <= max;

const isFaced = (selected: CellSelectProps, x: number, y: number): Boolean => {
  if (selected.x === x) return true;
  if (selected.y === y) return true;

  if (isBetween(selected.x, 0, 2) && isBetween(selected.y, 0, 2) && isBetween(x, 0, 2) && isBetween(y, 0, 2)) return true;
  if (isBetween(selected.x, 3, 5) && isBetween(selected.y, 0, 2) && isBetween(x, 3, 5) && isBetween(y, 0, 2)) return true;
  if (isBetween(selected.x, 6, 8) && isBetween(selected.y, 0, 2) && isBetween(x, 6, 8) && isBetween(y, 0, 2)) return true;
  if (isBetween(selected.x, 0, 2) && isBetween(selected.y, 3, 5) && isBetween(x, 0, 2) && isBetween(y, 3, 5)) return true;
  if (isBetween(selected.x, 3, 5) && isBetween(selected.y, 3, 5) && isBetween(x, 3, 5) && isBetween(y, 3, 5)) return true;
  if (isBetween(selected.x, 6, 8) && isBetween(selected.y, 3, 5) && isBetween(x, 6, 8) && isBetween(y, 3, 5)) return true;
  if (isBetween(selected.x, 0, 2) && isBetween(selected.y, 6, 8) && isBetween(x, 0, 2) && isBetween(y, 6, 8)) return true;
  if (isBetween(selected.x, 3, 5) && isBetween(selected.y, 6, 8) && isBetween(x, 3, 5) && isBetween(y, 6, 8)) return true;
  if (isBetween(selected.x, 6, 8) && isBetween(selected.y, 6, 8) && isBetween(x, 6, 8) && isBetween(y, 6, 8)) return true;

  return false;
};

const Grid: React.SFC<GridProps> = props => {
  const cells = props.board.map((line, x) => 
    line.map((cell, y) => (
      <Cell
        key={x * 10 + y}
        x={x} y={y}
        selected={x === props.selectedCell.x && y === props.selectedCell.y ? true : false}
        faced={isFaced(props.selectedCell, x, y)}
        onClick={props.onClick}
      >
        {(cell === 0 ? '' : cell)}
      </Cell>
    ))
  );
  return (
    <Wrapper size={9}>
      {cells}
    </Wrapper>
  );
};

export default Grid;
