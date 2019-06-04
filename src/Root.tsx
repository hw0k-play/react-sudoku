import React from 'react';

import App from 'containers/App';

import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';

const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;
