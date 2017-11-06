const views = require("./views");
const actions = require("./actions");
const model = require("./model");
const persistence = require("./persistence");

module.exports = Object.assign({}, model, views, actions, persistence);
