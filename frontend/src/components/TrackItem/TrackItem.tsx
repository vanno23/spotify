import { tracksData } from "../../GenericTypeScript/Track";
import "./TrackItem.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import likeService from "../../storedData/likeService";
import TrackDefaultImage from "../../images/TrackDefaultImage.png";
import { showSuccessMessage } from "../../storedData/messageActions";
import historyService from "../../storedData/historyService";

interface TrackItemProps {
  item: tracksData;
  index: number;
  page?: string;
}

const TrackItem = ({ item, index, page }: TrackItemProps) => {
  const [itemSaved, setItemSaved] = useState<boolean>(false);
  const user = useSelector((state: any) => state.user);
  const likedItems = useSelector((state: any) => state.likeItems);
  const historyItems = useSelector((state: any) => state.historyItems);
  const dispatch = useDispatch();

  const follow = async (likedType: string) => {
    if (user.user) {
      const isItemExists = likedItems.likedItems.some(
        (likedItem: any) => likedItem.itemId === item.id
      );
      if (!isItemExists) {
        dispatch(showSuccessMessage(`${likedType} is liked`));
        dispatch({
          type: "SET_LIKED_ITEMS",
          payload: [
            ...likedItems.likedItems,
            { itemId: item.id, itemType: item.type },
          ],
        });
      } else {
        dispatch(showSuccessMessage(`${likedType} is unliked`));
        dispatch({
          type: "SET_LIKED_ITEMS",
          payload: likedItems.likedItems.filter(
            (likedItem: any) => likedItem.itemId !== item.id
          ),
        });
      }
    }

    await likeService.likeItem(
      { itemId: item.id, itemType: item.type },
      user?.user?.token,
      dispatch
    );
  };

  const SaveToHistory = async (id?: string, type?: string) => {
    if (user.user) {
      const itemIdToCheck = id || item?.id; // Use id if it exists, otherwise use item.id
      const itemTypeToCheck = type || item?.type;
      const isItemExists = historyItems.historyItems.some(
        (historyItem: any) => historyItem.itemId === itemIdToCheck
      );
      if (!isItemExists) {
        dispatch({
          type: "SET_HISTORY_ITEMS",
          payload: [
            ...historyItems.historyItems,
            { itemId: itemIdToCheck, itemType: itemTypeToCheck },
          ],
        });
      }
      await historyService.historyItem(
        { itemId: itemIdToCheck, itemType: itemTypeToCheck },
        user?.user?.token
      );
    }
  };

  useEffect(() => {
    const isItemSaved = likedItems.likedItems.some(
      (likedItem: any) => likedItem.itemId === item.id
    );
    setItemSaved(isItemSaved);
  }, [likedItems.likedItems, item.id]);

  return (
    <div className="trackItem">
      <div
        className={`aboutTrack ${
          page === "searchTopTracks"
            ? "searchTopTracks"
            : page === "searchedType"
            ? "searchedType"
            : ""
        }`}
      >
        {page !== "searchTopTracks" && (
          <div className="startTrackBtn">
            <p className="index">{index + 1}</p>
            <button aria-label="Play Track">
              <i className="fa-solid fa-play"></i>
            </button>
          </div>
        )}

        <div className="trackInfo">
          {page === "track" ? (
            ""
          ) : (
            <div className="trackImage">
              <img
                src={item?.album?.images?.[2]?.url || TrackDefaultImage}
                alt="artistImage"
                loading="lazy"
              />
              {page === "searchTopTracks" && (
                <button aria-label="Play Track">
                  <i className="fa-solid fa-play"></i>
                </button>
              )}
            </div>
          )}
          <div style={{ overflow: "hidden" }}>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <Link
                to={`/track/${item?.id}`}
                onClick={() =>
                  page === "searchTopTracks" || page === "searchedType"
                    ? SaveToHistory()
                    : undefined
                }
              >
                {item?.name}
              </Link>
            </div>
            {page === "track" ||
            page === "profile" ||
            page === "searchTopTracks" ? (
              <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                <Link
                  className="artistName"
                  to={`/artist/${item?.artists[0]?.id}`}
                  onClick={() =>
                    page === "searchTopTracks"
                      ? SaveToHistory(
                          item?.artists[0]?.id,
                          item?.artists[0]?.type
                        )
                      : undefined
                  }
                >
                  {item?.artists[0]?.name}
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        {page === "searchedType" && (
          <div className="trackItemAlbumName">
            <p>{item?.album?.name}</p>
          </div>
        )}

        <div className="trackDuration">
          <div className="trackFavorite">
            <button
              className={`${itemSaved ? "saved" : ""}`}
              aria-label="Add to Favorites"
              onClick={() => follow("Track")}
            >
              {itemSaved ? (
                <i className="fa-solid fa-heart"></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}
            </button>
          </div>
          <p>
            {Math.floor(item?.duration_ms / 60000)}:
            {Math.floor((item?.duration_ms % 60000) / 1000)
              .toFixed(0)
              .padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackItem;
