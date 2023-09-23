import axios from "axios";

const getHistoryItems = async (token, dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.get(
      "http://localhost:5000/api/history/getData",
      config
    );
    dispatch({
      type: "SET_HISTORY_ITEMS",
      payload: response.data,
    });
  } catch (error) {
    // const errorMessage = error.response?.data?.message || "Error saving item";
  }
};

const historyItem = async (itemData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post("http://localhost:5000/api/history", itemData, config);
  } catch (error) {
    // const errorMessage = error.response?.data?.message || "Error liking item";
    // dispatch(showErrorMessage(errorMessage));
  }
};

const deleteItem = async (itemData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.post(
      "http://localhost:5000/api/history/delete",
      itemData,
      config
    );
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Error liking item";
    // dispatch(showErrorMessage(errorMessage));
  }
};

const historyService = {
  historyItem,
  getHistoryItems,
  deleteItem,
};

export default historyService;
