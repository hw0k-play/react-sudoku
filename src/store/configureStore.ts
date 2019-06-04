import { createStore, Store, compose, applyMiddleware } from 'redux';
import modules, { StoreState } from 'modules';

import createSagaMiddleware from 'redux-saga';
import entrySaga from 'sagas';

import logger from 'redux-logger';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(): Store<StoreState> {
  const store = createStore(
    modules,
    composeEnhancers(
      applyMiddleware(sagaMiddleware, logger)
    )
  );

  sagaMiddleware.run(entrySaga);

  return store;
}
