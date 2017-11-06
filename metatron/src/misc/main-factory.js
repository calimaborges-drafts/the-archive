import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { context } from './context-reducer';
import { snippets, snippetEdit } from '../snippets/snippets-reducer';
import { currentMenuItem, filter } from '../main/main-reducers';

// Redux configuration
const middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(logger);
}
export const store = createStore(
  combineReducers(
    {
      context,
      snippets,
      snippetEdit,
      currentMenuItem,
      filter,
    },
  ), applyMiddleware(...middlewares),
);

export default { store };
