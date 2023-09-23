import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import spotifyApi from "../../api/spotifyApi";
import { Link, useLocation } from "react-router-dom";
import "./UserLibraryData.scss";
import { LibraryDataProps } from "./libraryDataType";
import LibrarySearch from "./LibrarySearch";
import TrackDefaultImage from "../../images/TrackDefaultImage.png";
// import { AiOutlineClose } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
interface ButtonProps {
  type: string;
  isActive: boolean;
  onClick: () => void;
}

interface UserLibraryDataProsp {
  showHideNavbar: boolean;
}

const Button: React.FC<ButtonProps> = ({ type, isActive, onClick }) => (
  <button
    className={`uniqueButton ${isActive ? "libraryActiveButton" : ""}`}
    onClick={onClick}
  >
    <span>{type}</span>
  </button>
);
const UserLibraryData = ({ showHideNavbar }: UserLibraryDataProsp) => {
  const [likedData, setLikedData] = useState<LibraryDataProps[]>([]);
  const [storedLikedData, setStoredLikedData] = useState<LibraryDataProps[]>(
    []
  );
  const location = useLocation();
  const [librarySearchValue, setLibrarySearchValue] = useState<string>("");
  const likedItems = useSelector((state: any) => state.likeItems);
  const user = useSelector((state: any) => state.user);
  const [activeButton, setActiveButton] = useState<string>("");

  const uniqueTypes: string[] = Array.from(
    new Set(
      likedItems.likedItems.map((item: { itemType: string }) => item.itemType)
    )
  );

  useEffect(() => {
    const fetchLikedData = async () => {
      const responses = await Promise.all(
        likedItems.likedItems.map(
          async (item: { itemType: string; itemId: string }) => {
            return await spotifyApi.getBrowse(
              `${item.itemType}s/${item.itemId}`
            );
          }
        )
      );
      setLikedData(responses);
      setStoredLikedData(responses);
    };
    fetchLikedData();
  }, [likedItems.likedItems, user.user]);

  useEffect(() => {
    const lowerSearchValue = librarySearchValue.toLowerCase();
    const filteredData = storedLikedData.filter((item) => {
      if (!activeButton || item.type === activeButton) {
        return item.name.toLowerCase().includes(lowerSearchValue);
      }
      return false;
    });
    setLikedData(filteredData);
  }, [activeButton, librarySearchValue, storedLikedData]);

  const getUniqueLibraryData = (type: string): any => {
    const newLibraryData = [...storedLikedData].filter(
      (item) => item.type === type.toLowerCase()
    );
    setLikedData(newLibraryData);
    setActiveButton(type);
  };

  const DeleteTheSelectedButton = () => {
    setActiveButton("");
    setLikedData([...storedLikedData]);
  };

  const swiperOptions = {
    slidesPerView: "auto" as const,
    spaceBetween: 8,
  };

  return (
    <>
      <div
        className={`libraryTypes ${!showHideNavbar ? "libraryTypesHide" : ""}`}
      >
        {activeButton ? (
          <div className="activeButtonHeader">
            <button
              className="closeActiveHeader"
              onClick={DeleteTheSelectedButton}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
            <Button
              type={activeButton}
              isActive={true}
              onClick={DeleteTheSelectedButton}
            />
          </div>
        ) : (
          <Swiper {...swiperOptions} style={{ zIndex: "0" }}>
            {uniqueTypes.map((type, index) => (
              <SwiperSlide
                style={{ zIndex: "0" }}
                key={index}
                className="headerLibrarySlide"
              >
                <Button
                  type={type}
                  isActive={type === activeButton}
                  onClick={() => getUniqueLibraryData(type)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <LibrarySearch
        librarySearchValue={librarySearchValue}
        setLibrarySearchValue={setLibrarySearchValue}
        showHideNavbar={showHideNavbar}
      />
      <div
        className={`libraryData ${!showHideNavbar ? "libraryDataHide" : ""}`}
      >
        {likedData?.map((item) => {
          const searchString = librarySearchValue.toLowerCase();
          const regex = new RegExp(searchString, "gi");
          const matchedName = item.name.replace(regex, (match) => {
            return `<mark class="searchedLetter">${match}</mark>`;
          });
          return (
            <Link to={`${item.type}/${item.id}`} key={item.id}>
              <div
                className={`libraryDataItem ${
                  location.pathname === `/${item.type}/${item.id}`
                    ? "activeLibraryDataItem"
                    : ""
                }`}
              >
                <div className="libraryDataImg">
                  <img
                    className={`${
                      item.type === "artist" ? "libraryArtistImg" : ""
                    }`}
                    src={
                      item?.images?.[2]?.url ||
                      item?.album?.images?.[2]?.url ||
                      item?.images?.[0]?.url ||
                      TrackDefaultImage
                    }
                    alt="img"
                  />
                </div>
                <div
                  className={`libraryDataDetails ${
                    !showHideNavbar ? "libraryDataDetailsHide" : ""
                  }`}
                >
                  <h5
                    className="libraryDataName"
                    dangerouslySetInnerHTML={{ __html: matchedName }}
                  />

                  <span className="libraryDataType">{item.type}</span>
                  {item.type === "album" ? (
                    <span className="libraryDataArtistName">
                      {item?.artists?.[0]?.name}
                    </span>
                  ) : item.type === "playlist" ? (
                    <span className="libraryDataArtistName">
                      {item?.owner?.display_name}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default UserLibraryData;
