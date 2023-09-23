const initialState = {
  historyItems: [],
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_HISTORY_ITEMS":
      return {
        ...state,
        historyItems: action.payload,
      };
    case "RESET_HISTORY_ITEMS":
      return {
        ...state,
        historyItems: [],
      };
    default:
      return state;
  }
};

export default historyReducer;
