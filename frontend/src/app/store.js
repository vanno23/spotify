import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../storedData/user";
import likeReducer from "../storedData/likeSlice";
import historyReducer from "../storedData/historySlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    likeItems: likeReducer,
    historyItems: historyReducer,
  },
});

export default store;
