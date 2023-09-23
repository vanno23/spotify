import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./LogginHeader.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SearchInput from "./SearchInput";
import SearchHeader from "../SearchHeader/SearchHeader";

const LogginHeader = () => {
  const [userDropDown, setUserDropDown] = useState<boolean>(false);
  const [showPremiumLink, setShowPremiumLink] = useState<boolean>(true); // Initialize to true

  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const dropdownRef = useRef<null | HTMLDivElement>(null);
  const location = useLocation();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as HTMLDivElement).contains(event.target as Node)
    ) {
      setUserDropDown(false);
    }
  };

  useEffect(() => {
    if (userDropDown) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [userDropDown]);

  useEffect(() => {
    // Check window width on component mount and when it's resized
    const handleWindowResize = () => {
      setShowPremiumLink(window.innerWidth >= 768); // Set showPremiumLink based on window width
    };

    handleWindowResize(); // Call on mount

    window.addEventListener("resize", handleWindowResize); // Add listener for window resize

    return () => {
      window.removeEventListener("resize", handleWindowResize); // Remove listener on component unmount
    };
  }, []);

  const logout = (): void => {
    localStorage.removeItem("user");
    dispatch({ type: "USER_SIGNOUT" });
    dispatch({ type: "RESET_LIKED_ITEMS" });
    dispatch({ type: "RESET_HISTORY_ITEMS" });
    setUserDropDown(false);
    const container: Element | null = document.querySelector(".mainContent");
    if (container) {
      container.scrollTop = 0;
    }
  };

  return (
    <>
      <div
        className={`loggin ${
          location.pathname.startsWith("/search/") ? "searchPage" : ""
        }`}
      >
        <div className="logginHeader">
          {location.pathname.startsWith("/search") ? (
            <SearchInput />
          ) : (
            <div></div>
          )}
          <div className={`logginLinks ${user.user ? "logOutSection" : ""}`}>
            {user.user ? (
              <>
                <div className="logOutHeader">
                  {showPremiumLink && ( // Conditionally render Explore Premium link
                    <Link
                      className="explorePremium"
                      to="https://www.spotify.com/us/premium/"
                      target="_blank"
                    >
                      Explore Premium
                    </Link>
                  )}
                  <div className="userDropDown">
                    <button
                      ref={dropdownRef as any}
                      aria-label="user-drop-down-icon"
                      className="fa-userIcon"
                      onClick={() => setUserDropDown(!userDropDown)}
                    >
                      <i className="fa-regular fa-user"></i>
                    </button>
                    <div
                      className={`userDropDownSection ${
                        userDropDown ? "active" : ""
                      }`}
                    >
                      <ul>
                        <li>
                          <Link to={`/user/${user.user._id}`}>Profile</Link>
                        </li>
                        <li>
                          <Link
                            to="https://www.spotify.com/us/premium/"
                            target="_blank"
                          >
                            Upgrade to Premium
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          </Link>
                        </li>
                        <li onClick={logout} className="logOut">
                          <Link to="/">Log out</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/register" className="signUpLink">
                  Sign up
                </Link>
                <Link to="/login" className="logInLink">
                  <span>Log in</span>
                </Link>
              </>
            )}
          </div>
        </div>
        {location.pathname.startsWith("/search/") && <SearchHeader />}
      </div>
    </>
  );
};

export default LogginHeader;
