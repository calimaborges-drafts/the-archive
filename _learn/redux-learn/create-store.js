'use strict';

const createStore = (reducer) => {
    let state;
    let listeners = [];

    const getState = () => state;

    const dispatch = (action) => {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }

    const subscribe = (listener) => {
        listeners.push(listener);
        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    };

    dispatch({});

    return { getState, dispatch, subscribe };
};

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
