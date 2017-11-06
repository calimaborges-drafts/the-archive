const persistence = require("./persistence");
const actions = require("./actions");
const reducers = require("./reducers");
const filters = require("./filters");
const views = require("./views");

const SNIPPET_EDIT_WINDOW = "SNIPPET_EDIT_WINDOW";

module.exports = Object.assign(
  {},
  persistence,
  actions,
  reducers,
  filters,
  views,
  { SNIPPET_EDIT_WINDOW }
);
