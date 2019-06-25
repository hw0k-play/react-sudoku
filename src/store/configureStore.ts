import { createStore, Store, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import modules, { StoreState } from 'modules';

import createSagaMiddleware from 'redux-saga';
import entrySaga from 'sagas';

import logger from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(): Store<StoreState> {
  const store = createStore(
    modules,
    composeWithDevTools(
      applyMiddleware(sagaMiddleware, logger)
    )
  );

  sagaMiddleware.run(entrySaga);

  return store;
}
