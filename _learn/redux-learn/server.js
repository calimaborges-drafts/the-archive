'use strict';

const express = require('express');

let app = express();
app.use(express.static('.'));

app.listen('1337');
console.log("http://localhost:1337/");
