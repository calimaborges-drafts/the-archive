import * as t from "../types";

export const status = (state = null, action) => {
  switch (action.type) {
    case t.FETCH_STATUS_SUCCESS:
      return { ...action.status };
    default:
      return state;
  }
};
