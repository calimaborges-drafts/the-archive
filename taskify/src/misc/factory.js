import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { router } from 'capiroute';

import { taskify } from '../misc/redux/reducers';

// Redux configuration
let middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger();
    middlewares.push(logger);
}
const store = createStore(taskify, applyMiddleware(...middlewares));

export {
    router,
    store
}
