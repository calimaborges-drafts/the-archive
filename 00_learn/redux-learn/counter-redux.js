'use strict';

const Redux = require('redux');
const createStore = Redux.createStore;

const counter = (state, action) => {
    if (state === undefined) return 0;

    switch (action.type) {
        case 'INCREMENT' : return state + 1;
        case 'DECREMENT' : return state - 1;
        default          : return state;
    }
};

const store = createStore(counter);

store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch({type: 'INCREMENT' });
store.dispatch({type: 'INCREMENT' });
store.dispatch({type: 'INCREMENT' });
