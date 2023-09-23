import { useEffect, useState } from "react";
import { playlistPageTracksDataTypes } from "../../GenericTypeScript/playlistPageTracksData";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import likeService from "../../storedData/likeService";
import TrackDefaultImage from "../../images/TrackDefaultImage.png";
import { showSuccessMessage } from "../../storedData/messageActions";
interface PlaylistTrackListProps {
  item: playlistPageTracksDataTypes;
  index: number;
}

const PlaylistTrackList = ({ item, index }: PlaylistTrackListProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const likedItems = useSelector((state: any) => state.likeItems);
  const [itemSaved, setItemSaved] = useState<boolean>(false);

  const follow = async (likedType: string) => {
    if (user.user) {
      const isItemExists = likedItems.likedItems.some(
        (likedItem: any) => likedItem.itemId === item.track.id
      );

      if (!isItemExists) {
        dispatch(showSuccessMessage(`${likedType} is liked`));

        dispatch({
          type: "SET_LIKED_ITEMS",
          payload: [
            ...likedItems.likedItems,
            { itemId: item.track.id, itemType: item.track.type },
          ],
        });
      } else {
        dispatch(showSuccessMessage(`${likedType} is unliked`));
        dispatch({
          type: "SET_LIKED_ITEMS",
          payload: likedItems.likedItems.filter(
            (likedItem: any) => likedItem.itemId !== item.track.id
          ),
        });
      }
    }

    await likeService.likeItem(
      { itemId: item.track.id, itemType: item.track.type },
      user?.user?.token,
      dispatch
    );
  };

  useEffect(() => {
    const isItemSaved = likedItems.likedItems.some(
      (likedItem: any) => likedItem.itemId === item.track.id
    );
    setItemSaved(isItemSaved);
  }, [likedItems.likedItems, item.track.id]);
  return (
    <div className="trackItem">
      <div className="aboutTrack">
        <div className="startTrackBtn">
          <p className="index">{index + 1}</p>
          <button aria-label="Play Track">
            {" "}
            <i className="fa-solid fa-play"></i>
          </button>
        </div>

        <div className="trackInfo">
          <div className="trackImage">
            <img
              src={item?.track?.album?.images?.[2]?.url || TrackDefaultImage}
              alt="artistImage"
              loading="lazy"
            />
          </div>
          <div style={{ overflow: "hidden" }}>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <Link to={`/track/${item?.track?.id}`}>{item?.track?.name}</Link>
            </div>
            <div style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
              <Link
                className="artistName"
                to={`/artist/${item?.track?.artists[0]?.id}`}
              >
                {item?.track?.artists[0]?.name}
              </Link>
            </div>
          </div>
        </div>

        <div className="albumName">
          <p>{item?.track?.album?.name}</p>
        </div>
        <div className="formatDate">
          <p>
            {new Date(item?.added_at).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

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
            {Math.floor(item?.track?.duration_ms / 60000)}:
            {Math.floor((item?.track?.duration_ms % 60000) / 1000)
              .toFixed(0)
              .padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaylistTrackList;
