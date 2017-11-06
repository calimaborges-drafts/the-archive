import moment from 'moment';

export const kInbox = 'inbox';
export const kCompleted = 'completed';
export const kPostponed = 'postponed';

export const isInbox = (task) => {
    return !task.completed && (!task.postpone_date || task.postpone_date <= moment());
};

export const isPostponed = (task) => {
    return !task.completed && task.postpone_date > moment();
};

export const isCompleted = (task) => {
    return task.completed;
};
