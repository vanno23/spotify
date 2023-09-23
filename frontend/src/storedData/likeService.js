import axios from "axios";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../storedData/messageActions";

// post liked item
const likeItem = async (itemData, token, dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post("http://localhost:5000/api/likedItems", itemData, config);
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error liking item";
    dispatch(showErrorMessage(errorMessage));
  }
};

// get likedItems
const getLikedItems = async (token, dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "http://localhost:5000/api/likedItems",
      config
    );

    dispatch(showSuccessMessage(response.data.message));
    dispatch({
      type: "SET_LIKED_ITEMS",
      payload: response.data,
    });
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error liking item";
  }
};

const likeService = {
  likeItem,
  getLikedItems,
};

export default likeService;
