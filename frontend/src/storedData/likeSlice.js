const initialState = {
  likedItems: [],
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LIKED_ITEMS":
      return {
        ...state,
        likedItems: action.payload,
      };
    case "RESET_LIKED_ITEMS":
      return {
        ...state,
        likedItems: [],
      };
    default:
      return state;
  }
};

export default likeReducer;
