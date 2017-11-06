import * as t from "../types";

export const alerts = (state = [], action) => {
  const { alert } = action;
  switch (action.type) {
    case t.ADD_ALERT:
      return [...state, { ...alert }];
    case t.DISMISS_ALERT:
      return state.filter(a => a.id !== alert.id);
    default:
      return state;
  }
};
