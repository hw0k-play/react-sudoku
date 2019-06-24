import React from 'react';

import styled from 'styled-components';

import { CellSelectProps } from './Grid';

type WrapperProps = {
  x: number;
  y: number;
  selected: Boolean;
  faced: Boolean;
  onClick: (props: CellSelectProps) => void;
};

const Wrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props: WrapperProps) => props.faced ? `var(--oc-gray-1)` : `var(--oc-white)`};
  border: 1px solid var(--oc-gray-3);
  cursor: default;

  ${
    (props: WrapperProps) => `
      ${props.x % 3 === 2 ? `border-bottom: 1px solid var(--oc-gray-6);` : ``}
      ${props.x % 3 === 0 ? `border-top: 1px solid var(--oc-gray-6);` : ``}
      ${props.y % 3 === 2 ? `border-right: 1px solid var(--oc-gray-6);` : ``}
      ${props.y % 3 === 0 ? `border-left: 1px solid var(--oc-gray-6);` : ``}
      ${props.selected && `border: 1px solid var(--oc-red-6);`}
    `
  }
`;

type CellProps = WrapperProps & { children?: React.ReactNode };

const Cell: React.SFC<CellProps> = props => {
  return (
    <Wrapper x={props.x} y={props.y} selected={props.selected} faced={props.faced} onClick={() => props.onClick({x: props.x, y: props.y})}>
      {props.children}
    </Wrapper>
  );
};

export default React.memo(Cell);
