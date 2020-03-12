import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import loggerMiddleware from 'redux-logger';
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(loggerMiddleware, thunk));
};

export default configureStore;