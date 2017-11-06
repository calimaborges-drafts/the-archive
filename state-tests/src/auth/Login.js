import React from 'react';
import updateStore from '../actions/update-store';
import login from '../actions/login';
import store from '../store';

const Login = () => {

    return (
        <form onSubmit={login}>
            <input placeholder="username" value={store.username} onChange={updateStore('username')} />
            <input placeholder="password" type="password" value={store.password} onChange={updateStore('password')} />

            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
