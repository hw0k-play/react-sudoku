import React from 'react';

import App from 'containers/App';

import { getBoard } from 'utils/API/sudoku';

class Root extends React.Component {
  componentDidMount() {
    getBoard();
  }

  render() {
    return (
      <App />
    );
  }
}

export default Root;
