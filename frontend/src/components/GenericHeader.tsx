import React, { useEffect, useState } from "react";
import "./GenericHeader.scss";
import useArtistHeader from "../customHook/useArtistHeader";
import { useDispatch, useSelector } from "react-redux";
import likeService from "../storedData/likeService";
import { showSuccessMessage } from "../storedData/messageActions";

interface GenericHeaderProps {
  page: string;
  imageUrl: string;
  customSection: JSX.Element;
  itemId?: string;
  itemType?: string;
  likedType?: string;
}

const GenericHeader: React.FC<GenericHeaderProps> = ({
  page,
  imageUrl,
  customSection,
  itemId,
  itemType,
  likedType,
}) => {
  const { bgColor } = useArtistHeader(imageUrl || "");
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.user);
  const likedItems = useSelector((state: any) => state.likeItems);
  const [itemSaved, setItemSaved] = useState<boolean>(false);

  const follow = async (likedType: string) => {
    if (user.user) {
      const isItemExists = likedItems.likedItems.some(
        (item: any) => item.itemId === itemId
      );

      if (!isItemExists) {
        dispatch(showSuccessMessage(`${likedType} is liked`));
        dispatch({
          type: "SET_LIKED_ITEMS",
          payload: [...likedItems.likedItems, { itemId, itemType }],
        });
      } else {
        dispatch(showSuccessMessage(`${likedType} is unliked`));
        dispatch({
          type: "SET_LIKED_ITEMS",
          payload: likedItems.likedItems.filter(
            (item: any) => item.itemId !== itemId
          ),
        });
      }
    }

    await likeService.likeItem(
      { itemId, itemType },
      user?.user?.token,
      dispatch
    );
  };

  useEffect(() => {
    const isItemSaved = likedItems.likedItems.some(
      (item: any) => item.itemId === itemId
    );
    setItemSaved(isItemSaved);
  }, [itemId, likedItems.likedItems]);

  return (
    <>
      <div
        className="sectionHeader"
        style={
          imageUrl.length > 0
            ? { backgroundColor: bgColor }
            : { backgroundColor: "rgb(83, 83, 83)" }
        }
      >
        {imageUrl ? (
          <img
            className={`artistImg ${page === "artist" ? "artist" : ""}`}
            src={imageUrl}
            alt="artistImg"
          />
        ) : (
          <div className="profile-fa-user">
            <i className="fa-regular fa-user"></i>
          </div>
        )}
        {customSection}
      </div>
      {page !== "profile" && (
        <div className="trackHeader">
          <div className="startAlbum">
            <button aria-label="Start Album">
              <i className="fa-solid fa-play"></i>
            </button>
          </div>
          {page === "artist" ? (
            <button
              className="followBtn"
              aria-label="Follow"
              onClick={() => follow("Artist")}
            >
              <div>
                <p>{itemSaved ? "following" : "follow"}</p>
              </div>
            </button>
          ) : (
            <button
              className={`heartButton ${itemSaved ? "saved" : ""}`}
              aria-label="HeartIcon"
              onClick={() => likedType && follow(likedType)}
            >
              {itemSaved ? (
                <i className="fa-solid fa-heart"></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}{" "}
            </button>
          )}
        </div>
      )}
      <div className="sectionButtom">
        <div style={{ background: bgColor }} className="albumTrackHeader"></div>
      </div>
    </>
  );
};

export default GenericHeader;
