'use strict';

let React = require('react');
let ReactDOM = require('react-dom');
let App = require('./react/App.jsx');

let mountNode = document.getElementById("main");
ReactDOM.render(<App />, mountNode);
