const SET_CONTEXT = "SET_CONTEXT";
const setContext = id => {
  return {
    type: SET_CONTEXT,
    id
  };
};

const context = (state = {}, action) => {
  switch (action.type) {
    case SET_CONTEXT:
      return Object.assign({}, state, { [action.id]: action.contextType });
    default:
      return state;
  }
};

module.exports = {
  setContext,
  context
};
