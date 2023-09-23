import { useState, useEffect } from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import likeService from "../../storedData/likeService";
import UserLibraryData from "../UserLibrary/UserLibraryData";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import FindArtist from "../FindArtist/FindArtist";

const NavBar = () => {
  const user = useSelector((state: any) => state.user);
  const likedItems = useSelector((state: any) => state.likeItems);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLikedItems = async () => {
      await likeService.getLikedItems(user?.user?.token, dispatch);
    };

    fetchLikedItems();
  }, [dispatch, user?.user?.token]);

  const [activeHomePage, setActiveHomePage] = useState<boolean>(true);
  const [activeSearchPage, setActiveSearchPage] = useState<boolean>(false);
  const [showHideNavbar, setShowHideNavbar] = useState<boolean>(
    window.innerWidth >= 1024
  );

  const location = useLocation();

  useEffect(() => {
    setActiveHomePage(location.pathname === "/");
    setActiveSearchPage(location.pathname === "/search");
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      setShowHideNavbar(window.innerWidth >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`NavBar ${showHideNavbar ? "showNav" : "hideNav"}`}>
      <div className="navHeader">
        <ul>
          <li className="show-hide-navbar">
            <button
              className={`icon`}
              onClick={() => setShowHideNavbar(!showHideNavbar)}
              aria-label="showButton"
            >
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
            </button>
          </li>
          <li className={`Home ${activeHomePage ? "active" : ""}`}>
            <Link to="/">
              <button aria-label="Home">
                {activeHomePage ? <HomeIcon /> : <HomeOutlinedIcon />}
              </button>
              <span className="navUlTitle">Home</span>
            </Link>
          </li>
          <li className={`Search ${activeSearchPage ? "active" : ""}`}>
            <Link to="/search">
              <button aria-label="Search">
                {activeSearchPage ? (
                  <SavedSearchIcon />
                ) : (
                  <SearchOutlinedIcon />
                )}
              </button>
              <span className="navUlTitle">Search</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="library">
        {user.user && likedItems.likedItems.length > 0 ? (
          <UserLibraryData showHideNavbar={showHideNavbar} />
        ) : (
          <FindArtist showHideNavbar={showHideNavbar} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
