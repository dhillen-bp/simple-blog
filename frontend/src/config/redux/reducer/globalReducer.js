const initialState = {
  name: "NELL",
};

const globalReducer = (state = initialState, action) => {
  if (action.type === "UPDATE_NAME") {
    return {
      ...state,
      name: "LLENN",
    };
  }
  return state;
};

export default globalReducer;
