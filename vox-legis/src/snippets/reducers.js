const { LOAD_SNIPPETS, FILTER_SNIPPETS } = require("./actions");

const snippets = (state = [], action) => {
  switch (action.type) {
    case LOAD_SNIPPETS:
      return [...action.payload];
    default:
      return state;
  }
};

const filter = (state = "", action) => {
  switch (action.type) {
    case FILTER_SNIPPETS:
      return action.filter;
    default:
      return state;
  }
};

module.exports = {
  snippets,
  filter
};
