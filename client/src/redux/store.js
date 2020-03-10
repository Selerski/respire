import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { createLogger } from 'redux-logger';

const loggerMiddleware = createLogger();

// export default function configureStore(preloadedState) {
//   return createStore(
//     rootReducer,
//     preloadedState,
//     applyMiddleware(thunk, loggerMiddleware)
//   );
// }
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, applyMiddleware(thunk, loggerMiddleware));
};

export default configureStore;