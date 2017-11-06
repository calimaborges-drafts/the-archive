import { store } from '../../factory';

export const getTask = (taskId) => {
    const { tasks } = store.getState();
    return tasks.filter( task => task._id === taskId )[0];
};
