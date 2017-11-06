import isRenderer from 'is-electron-renderer';
import { remote, dialog as mainDialog } from 'electron';

import { SET_CURRENT_CONTEXT, REQUEST_FAILED } from './action-types';

let dialog;

if (isRenderer) {
  dialog = remote.dialog;
} else {
  dialog = mainDialog;
}

export const setCurrentContext = (context) => ({
  type: SET_CURRENT_CONTEXT,
  context,
});

export const requestFailed = error => (dispatch) => {
  dispatch({ type: REQUEST_FAILED, error });
  dialog.showErrorBox('Error!', error.message);
};

export default {};
