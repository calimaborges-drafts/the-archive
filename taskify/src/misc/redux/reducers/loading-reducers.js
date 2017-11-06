import { combineReducers } from 'redux';
import * as t from '../types';


export const task = (state = null, action) => {
    switch (action.type) {
        case t.COMPLETE_TASK:
        case t.UNCOMPLETE_TASK:
        case t.POSTPONE_TASK:
        case t.DELETE_TASK:
            return action.task;
        case t.COMPLETE_TASK_SUCCESS:
        case t.UNCOMPLETE_TASK_SUCCESS:
        case t.POSTPONE_TASK_SUCCESS:
        case t.DELETE_TASK_SUCCESS:
            return null;
        default:
            return state;
    }
};

export const type = (state = null, action) => {
    switch (action.type) {
        case t.COMPLETE_TASK:
        case t.UNCOMPLETE_TASK:
        case t.POSTPONE_TASK:
        case t.DELETE_TASK:
        case t.AUTHENTICATE:
        case t.SIGNUP:
        case t.FETCH_TASKS:
        case t.SUBMIT_TASK:
        case t.FETCH_STATUS:
            return action.type;
        case t.COMPLETE_TASK_SUCCESS:
        case t.UNCOMPLETE_TASK_SUCCESS:
        case t.POSTPONE_TASK_SUCCESS:
        case t.DELETE_TASK_SUCCESS:
        case t.AUTHENTICATION_SUCCESS:
        case t.SIGNUP_SUCCESS:
        case t.FETCH_TASKS_SUCCESS:
        case t.SUBMIT_TASK_SUCCESS:
        case t.FETCH_STATUS_SUCCESS:
        case t.REQUEST_FAILED:
            return null;
        default:
            return state;
    }
};

export const loading = combineReducers({ type, task });
