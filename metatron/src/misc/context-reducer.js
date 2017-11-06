import * as ct from './context-types';
import * as t from './action-types';

export const context = (state = ct.MAIN, action) => {
  switch (action.type) {
    case t.SET_CURRENT_CONTEXT:
      return action.context;
    default:
      return state;
  }
};

export default { context };
