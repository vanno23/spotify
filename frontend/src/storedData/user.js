const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  error: null,
  successMessage: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload, error: null };
    case "USER_SIGNOUT":
      return { ...state, user: null, error: null };
    case "LOGIN_ERROR":
      return { ...state, error: action.payload, successMessage: null };
    case "SHOW_SUCCESS_MESSAGE":
      return { ...state, successMessage: action.payload, error: null };
    case "CLEAR_MESSAGES":
      return { ...state, error: null, successMessage: null };
    default:
      return state;
  }
};

export default userReducer;
