import React, { useEffect, useState } from "react";
import "./SearchHeader.scss";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
const searchType: string[] = [
  "All",
  "Artists",
  "Tracks",
  "Playlists",
  "Albums",
];

const SearchHeader = () => {
  const location = useLocation();
  const locationPathname = location.pathname.replace(/^\/search\//, "");

  // Extract the last part of the pathname
  const pathnameSegments = locationPathname.split("/");
  const locationPathname2 = pathnameSegments[pathnameSegments.length - 1];
  const [searchHeaderButton, setSearchHeaderButton] = useState(
    locationPathname2 || searchType[0]
  );
  const clearSearchType = () => {
    // Remove the existing search type segment from the URL
    const newPathname = locationPathname.replace(/\/[a-zA-Z]+$/, "");
    // Return the new URL without the previous search type
    return `/search/${newPathname}`;
  };

  useEffect(() => {
    if (locationPathname === locationPathname2) {
      setSearchHeaderButton("All");
    }
  }, [locationPathname, locationPathname2]);
  const swiperOptions = {
    slidesPerView: "auto" as const,
    spaceBetween: 10,
  };
  return (
    <div className="searchHeader">
      <div className="searchType">
        <Swiper {...swiperOptions}>
          {searchType.map((item, index) => (
            <SwiperSlide key={index} style={{ width: "auto" }}>
              <Link
                to={`${clearSearchType()}${
                  item === "All" ? "" : `/${item.toLowerCase()}`
                }`}
              >
                <button
                  onClick={() => setSearchHeaderButton(item)}
                  className={`${
                    item.toLocaleLowerCase() ===
                    searchHeaderButton.toLocaleLowerCase()
                      ? "activeSearchType"
                      : ""
                  }`}
                >
                  <span>{item}</span>
                </button>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SearchHeader;
