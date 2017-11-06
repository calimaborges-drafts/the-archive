'use strict';

const Redux = require('redux');
const React = require('react');
const ReactDOM = require('react-dom');
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

const Counter = ({value, onIncrement, onDecrement}) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

const render = () => {
    ReactDOM.render(
        <Counter value={store.getState()}
            onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
            onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();
