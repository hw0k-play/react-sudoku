import React from 'react';

import styled from 'styled-components';
import SudokuContainer from './SudokuContainer';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-content: center;
`;

const App: React.FC = () => {
  return (
    <Wrapper>
      <SudokuContainer />
    </Wrapper>
  );
};

export default App;
