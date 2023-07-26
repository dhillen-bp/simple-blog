const initialState = {
  form: {
    email: "",
    password: "",
  },
};

const loginReducer = (state = initialState, action) => {
  if (action.type === "SET_FORM_LOGIN") {
    return {
      ...state,
      form: {
        ...state.form,
        [action.formType]: action.formValue,
      },
    };
  }

  return state;
};

export default loginReducer;
