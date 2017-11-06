import * as t from '../types';
import { status } from '../../api';
import { requestFailed } from './request-actions';

export const fetchStatus = () => async (dispatch) => {
    dispatch({
        type: t.FETCH_STATUS
    });

    try {
        dispatch({
            type: t.FETCH_STATUS_SUCCESS,
            status: await status()
        });
    } catch (error) {
        dispatch(requestFailed(error));
    }
};
