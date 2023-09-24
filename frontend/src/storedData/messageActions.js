import { toast } from "react-toastify";

// Function to determine the toast position based on innerWidth
const getPosition = () => {
  if (window.innerWidth <= 600) {
    return "bottom-center";
  }
  // Return a default position (you can adjust this as needed)
  return "top-right";
};

// Function to determine the toast width based on innerWidth
const getToastWidth = () => {
  if (window.innerWidth <= 600) {
    return "150px"; // Full width on small screens
  }
  // Return a maximum width for larger screens (you can adjust this as needed)
  return "250px";
};

const customToastOptions = {
  position: getPosition(), // Set the position dynamically based on innerWidth
  style: {
    // Center horizontally by using margin auto
    margin: "10px auto",
    maxWidth: getToastWidth(), // Set the maximum width based on innerWidth
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
