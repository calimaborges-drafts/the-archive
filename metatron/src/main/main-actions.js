import { SELECT_NEXT_MENU_ITEM, SELECT_PREVIOUS_MENU_ITEM, SET_FILTER } from '../misc/action-types';

export const previousItem = () => ({
  type: SELECT_PREVIOUS_MENU_ITEM,
});

export const nextItem = () => ({
  type: SELECT_NEXT_MENU_ITEM,
});

export const setFilter = filter => ({
  type: SET_FILTER,
  filter,
});
