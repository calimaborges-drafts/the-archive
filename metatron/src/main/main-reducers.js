import { SELECT_NEXT_MENU_ITEM, SELECT_PREVIOUS_MENU_ITEM, SET_FILTER } from '../misc/action-types';


export const currentMenuItem = (state = null, action) => {
  switch (action.type) {
    case SELECT_NEXT_MENU_ITEM:
    case SELECT_PREVIOUS_MENU_ITEM:
    default:
      return state;
  }
};

export const filter = (state = '', action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.filter;
    default:
      return state;
  }
};

export default {};
