const initialState = {
  formRegister: {
    name: "",
    email: "",
    password: "",
  },
};

const registerReducer = (state = initialState, action) => {
  if (action.type === "SET_FORM_REGISTER") {
    return {
      ...state,
      formRegister: {
        ...state.formRegister,
        [action.formType]: action.formValue,
      },
    };
  }

  return state;
};

export default registerReducer;
