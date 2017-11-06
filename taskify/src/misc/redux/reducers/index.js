import { combineReducers } from 'redux';
import { tasks, taskForm } from './task-reducers';
import { alerts } from './alert-reducers';
import { status } from './status-reducers';
import { loading } from './loading-reducers';

export const taskify = combineReducers({ alerts, tasks, taskForm, status, loading });
