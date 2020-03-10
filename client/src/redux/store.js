import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk, loggerMiddleware));
};

export default configureStore;