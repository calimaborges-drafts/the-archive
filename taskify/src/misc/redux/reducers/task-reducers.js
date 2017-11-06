import * as t from '../types';

const task = (state, action) => {
    const { task, response } = action;
    switch (action.type) {
        case t.UNCOMPLETE_TASK_SUCCESS:
        case t.COMPLETE_TASK_SUCCESS:
        case t.UNPOSTPONE_TASK_SUCCESS:
        case t.POSTPONE_TASK_SUCCESS:
            if (task._id !== state._id)
                return state;
            else {
                return { ...state, ...response };
            }
        case t.SUBMIT_TASK_SUCCESS:
            if (!state) return {...response};
            if (state._id === task._id) return {...state, ...task};
            else return state;
        default:
            return state;
    }
};

export const tasks = (state = [], action) => {
    switch (action.type) {
        case t.FETCH_TASKS_SUCCESS:
            return [ ...action.tasks ];
        case t.DELETE_TASK_SUCCESS:
            return state.filter(t => t._id !== action.task._id);
        case t.COMPLETE_TASK_SUCCESS:
        case t.UNCOMPLETE_TASK_SUCCESS:
        case t.UNPOSTPONE_TASK_SUCCESS:
        case t.POSTPONE_TASK_SUCCESS:
        case t.SUBMIT_TASK_SUCCESS:
            if (action.task._id) {
                return state.map( t => task(t, action) );
            } else {
                return [...state, task(undefined, action) ];
            }

        default:
            return state;
    }
};

export const taskForm = (state = null, action) => {
    switch (action.type) {
        case t.PREPARE_TASK_FORM:
            return { ...action.task };
        case t.CHANGE_TASK_FORM:
            return { ...action.task, [action.field]: action.value };
        case t.SUBMIT_TASK:
        case t.CANCEL_TASK_FORM:
            return null;
        default:
            return state;

    }
};
