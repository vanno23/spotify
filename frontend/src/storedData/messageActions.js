import { toast } from "react-toastify";

// Function to determine the toast width based on innerWidth
const getToastWidth = () => {
  if (window.innerWidth <= 600) {
    return "150px";
  }
  // Return a default width (you can adjust this as needed)
  return "250px";
};

const customToastOptions = {
  position: "top-right", // Set the position to "top-right"
  style: {
    margin: "10px",
    float: "right",
    width: getToastWidth(), // Set the width dynamically based on innerWidth
  },
};

export const showSuccessMessage = (message) => {
  toast.success(message, customToastOptions);

  return {
    type: "SHOW_SUCCESS_MESSAGE",
    payload: message,
  };
};

export const showErrorMessage = (message) => {
  toast.error(message, customToastOptions);

  return {
    type: "SHOW_ERROR_MESSAGE",
    payload: message,
  };
};
