const resetProperty = (state, action) => {
  state[action.payload] = null;
  return state;
};

export default resetProperty;
