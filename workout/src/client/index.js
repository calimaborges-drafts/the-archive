'use strict';

let React = require('react');
let ReactDom = require('react-dom');
let App = require('./react/App.jsx');

let mountNode = document.getElementById('main');
ReactDom.render(<App />, mountNode);



