import React, { useState } from "react";
import "./ProfileDetailsModal.scss";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../storedData/messageActions";

interface ProfileDetailsModalProps {
  userName: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileDetailsModal = ({
  userName,
  setShowModal,
}: ProfileDetailsModalProps) => {
  const [userNameValue, setUserNameValue] = useState(() => {
    // Initialize userNameValue with userName when the component is first rendered
    return userName || "";
  });

  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user);
  const email = user.user.email;

  const changeUserData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.user.name !== userNameValue) {
      try {
        const response = await axios.put(
          "https://mern-spotifyweb.onrender.com/api/users/changeUserData",
          { email, name: userNameValue },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const updatedUserData = {
            ...user.user, // Get the user data from your Redux state or local storage
            name: response.data.name, // Update only the name field
          };
          localStorage.setItem("user", JSON.stringify(updatedUserData));
          dispatch({ type: "SET_USER", payload: updatedUserData });
          dispatch(showSuccessMessage(response.data.message));
        }
      } catch (error: any) {
        const errorMessage = error.response.data.message;
        dispatch(showErrorMessage(errorMessage));
      }
    }
    setShowModal(false);
  };

  return (
    <div className="profile-details-modal">
      <div className="profile-details">
        <div className="profile-details-header">
          <h2>Profile details</h2>
          <button
            className="close-profile-modal"
            aria-label="close-profile-details-modal"
            onClick={() => setShowModal(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="profile-modal-form">
          <button className="profile-modal-image" aria-label="user-image">
            <i className="fa-regular fa-user"></i>
          </button>
          <form
            className="profile-modal-input"
            onSubmit={(e) => changeUserData(e)}
          >
            <label>Change Name:</label>
            <input
              type="text"
              value={userNameValue}
              onChange={(e) => setUserNameValue(e.target.value)}
            />
            <button aria-label="save-user-data">Save</button>
          </form>
        </div>
        <p className="profile-modal-text">
          By proceeding, you agree to give Spotify access to the image you
          choose to upload. Please make sure you have the right to upload the
          image.
        </p>
      </div>
    </div>
  );
};

export default ProfileDetailsModal;
