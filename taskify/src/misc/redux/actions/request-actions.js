import * as t from '../types';
import { addAlert } from './alert-actions';

export const requestFailed = (error) => (dispatch) => {
    dispatch({
        type: t.REQUEST_FAILED
    });

    dispatch(addAlert("danger", "Error!", error.message));
    throw error;
};
