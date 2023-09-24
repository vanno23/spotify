import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ContainerItem.scss";
import { ContainerItemProps } from "./ContainerItemType";
import { useDispatch, useSelector } from "react-redux";
import historyService from "../../storedData/historyService";
import { showSuccessMessage } from "../../storedData/messageActions";

const ContainerItem: React.FC<ContainerItemProps> = ({ item, page }) => {
  const [imageDoesNotExist, setImageDoesNotExist] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user);
  const historyItems = useSelector((state: any) => state.historyItems);
  const dispatch = useDispatch();

  const getImageUrl = () => {
    let imageUrl;
    if ((page === "search" || page === "searchedType") && item?.album) {
      imageUrl = item.album.images?.[1]?.url || item.album.images?.[0]?.url;
    } else {
      imageUrl = item.images?.[1]?.url || item.images?.[0]?.url;
    }

    if (!imageUrl) {
      setImageDoesNotExist(true);
    }
    return imageUrl || "";
  };

  const getArtistName = () => {
    if (page === "album" || page === "track") {
      return item.release_date?.slice(0, 4) || "";
    } else if (page === "genre" && item.description.length > 0) {
      return item.description;
    } else if (page === "genre" && item.description.length === 0) {
      return "by " + item.owner.display_name;
    } else {
      return item.type;
    }
  };

  const SaveToHistory = async () => {
    if (user.user) {
      const isItemExists = historyItems.historyItems.some(
        (historyItem: any) => historyItem.itemId === item?.id
      );
      if (!isItemExists) {
        dispatch({
          type: "SET_HISTORY_ITEMS",
          payload: [
            ...historyItems.historyItems,
            { itemId: item?.id, itemType: item?.type },
          ],
        });
      }
      await historyService.historyItem(
        { itemId: item?.id, itemType: item?.type },
        user?.user?.token
      );
    }
  };

  const deleteItems = async () => {
    if (user.user) {
      const isItemExists = historyItems.historyItems.some(
        (likedItem: any) => likedItem.itemId === item.id
      );

      if (isItemExists) {
        dispatch(showSuccessMessage(`Item is deleted`));
        dispatch({
          type: "SET_HISTORY_ITEMS",
          payload: historyItems.historyItems.filter(
            (likedItem: any) => likedItem.itemId !== item.id
          ),
        });
      }
      await historyService.deleteItem(
        { itemId: item?.id, itemType: item?.type },
        user?.user?.token
      );
    }
  };

  return (
    <div className="containerItemLink">
      <div className="containerStartIcon">
        <button aria-label="Start track">
          <i className="fa-solid fa-play"></i>
        </button>
      </div>
      {page === "search" && (
        <button
          aria-label="deleteIcon"
          className="deleteHistoryItem"
          onClick={deleteItems}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
      <Link
        to={`/${item.type}/${item.id}`}
        onClick={
          page === "searchedDataPage" || page === "searchedType"
            ? SaveToHistory
            : undefined
        }
      >
        <div className="containerItem">
          {imageDoesNotExist ? (
            <div
              className={`containerItemBg ${
                item.type === "artist" ? "artist" : ""
              }`}
            >
              <i className="fa-regular fa-user userNotFound"></i>
            </div>
          ) : (
            <div
              className={`containerItemBg ${
                item.type === "artist" ? "artist" : ""
              }`}
              style={{ backgroundImage: `url(${getImageUrl()})` }}
            ></div>
          )}
          <h3>{item.name}</h3>
          <div className="album_type">
            <p className={`artistName ${page === "genre" ? "genreName" : ""}`}>
              {getArtistName()}
            </p>
            {page === "track" && <span>{item.album_type}</span>}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ContainerItem;
