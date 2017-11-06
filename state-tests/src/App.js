import React from 'react';
import logo from './logo.svg';
import Login from './auth/Login';
import './App.css';

import store from './store';

const puke = (obj) => <pre>{JSON.stringify(obj)}</pre>;

const App = () => {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Welcome to React</h2>
            </div>
            <Login />

            {puke(store.store)}
        </div>
    );
};

export default App;
