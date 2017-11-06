import * as t from '../misc/action-types';

const snippet = (state, action) => {
  switch (action.type) {
    case t.SUCCESS_FETCH_SNIPPET:
      if (action.snippet !== state) {
        return state;
      } else {
        return { ...state, ...action.snippet };
      }
    default:
      return state;
  }
};

export const snippets = (state = [], action) => {
  switch (action.type) {
    case t.SUCCESS_FETCH_SNIPPET:
      return [...action.snippets];
    default:
      return state;
  }
};

export const snippetEdit = (state = null, action) => {
  switch (action.type) {
    case t.EDIT_SNIPPET:
      return action.identifier;
    case t.SUCCESS_SAVE_SNIPPET:
      return null;
    default:
      return state;
  }
};
