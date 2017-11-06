import * as t from '../types';
import { router } from '../../factory';
import * as api from '../../api';
import { requestFailed } from './request-actions';
import { getTask } from "../filters/tasks-filter";

export const fetchTasks = () => async (dispatch) => {
    dispatch({
        type: t.FETCH_TASKS
    });

    try {
        dispatch({
            type: t.FETCH_TASKS_SUCCESS,
            tasks: await api.tasks()
        });
    } catch (error) {
        dispatch(requestFailed(error));
    }
};

const createTaskAction = (apiCall, preCommitActionType, postCommitActionType) => (task) => async (dispatch) => {
    dispatch({
        type: preCommitActionType,
        task
    });

    try {
        let response = await apiCall(task);
        dispatch({
            type: postCommitActionType,
            task,
            response
        });
    } catch (error) {
        dispatch(requestFailed(error));
    }
};

export const deleteTask     = createTaskAction(api.deleteTask, t.DELETE_TASK, t.DELETE_TASK_SUCCESS);
export const completeTask   = createTaskAction(api.completeTask, t.COMPLETE_TASK, t.COMPLETE_TASK_SUCCESS);
export const uncompleteTask = createTaskAction(api.uncompleteTask, t.UNCOMPLETE_TASK, t.UNCOMPLETE_TASK_SUCCESS);
export const postponeTask   = createTaskAction(api.postponeTask, t.POSTPONE_TASK, t.POSTPONE_TASK_SUCCESS);
export const unpostponeTask = createTaskAction(api.unpostponeTask, t.UNPOSTPONE_TASK, t.UNPOSTPONE_TASK_SUCCESS);
export const addTask        = createTaskAction(api.postTask, t.SUBMIT_TASK, t.SUBMIT_TASK_SUCCESS);
export const editTask       = createTaskAction(api.putTask, t.SUBMIT_TASK, t.SUBMIT_TASK_SUCCESS);

export const prepareTaskForm = (taskId) => {
    let task = getTask(taskId);

    return {
        type: t.PREPARE_TASK_FORM,
        task
    }
};

export const changeTaskForm = (task, field, value) => ({
    type: t.CHANGE_TASK_FORM,
    task, field, value
});

export const submitTaskForm = () => (dispatch, getState) => {
    const { taskForm } = getState();

    if (taskForm._id) {
        dispatch(editTask(taskForm));
    } else {
        dispatch(addTask(taskForm));
    }
    router.back();
};

export const cancelTaskForm = () => (dispatch) => {
    dispatch({
        type: t.CANCEL_TASK_FORM
    });
    router.back();
};
