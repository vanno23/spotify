import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import spotifyApi from "../../api/spotifyApi";
import "./SearchedTopTracks.scss";
import { tracksData } from "../../GenericTypeScript/Track";
import TrackItem from "../TrackItem/TrackItem";
import { artistDataProps } from "../../GenericTypeScript/Artist";
import historyService from "../../storedData/historyService";
import { useDispatch, useSelector } from "react-redux";
import SearchNoResult from "../SearchNoResult/SearchNoResult";
const SearchedTopTracks = () => {
  const [topArtist, setTopArtist] = useState<artistDataProps>();
  const [topTracks, setTopTracks] = useState<tracksData[]>([]);
  const user = useSelector((state: any) => state.user);
  const historyItems = useSelector((state: any) => state.historyItems);

  const { search_input } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const responseTopArtist = await spotifyApi.getBrowse(
          `search?q=${search_input}&type=artist&limit=1`
        );
        const responseTopTracks = await spotifyApi.getBrowse(
          `search?q=${search_input}&type=track&limit=4`
        );
        setTopTracks(responseTopTracks.tracks.items);
        setTopArtist(responseTopArtist.artists.items[0]);
      } catch (error) {
        // console.error("Error fetching category data:", error);
      }
    };

    fetchCategory();
  }, [search_input]);

  const SaveToHistory = async () => {
    if (user.user) {
      const isItemExists = historyItems.historyItems.some(
        (historyItem: any) => historyItem.itemId === topArtist?.id
      );
      if (!isItemExists) {
        dispatch({
          type: "SET_HISTORY_ITEMS",
          payload: [
            ...historyItems.historyItems,
            { itemId: topArtist?.id, itemType: topArtist?.type },
          ],
        });
      }
      await historyService.historyItem(
        { itemId: topArtist?.id, itemType: topArtist?.type },
        user?.user?.token
      );
    }
  };

  return topTracks.length > 0 || topArtist ? (
    <div className="topTracks">
      <div className="topResult">
        <h2 className="topResultTitle">Top Result</h2>
        <Link
          to={`/${topArtist?.type}/${topArtist?.id}`}
          onClick={SaveToHistory}
        >
          <div className="topResultContainer">
            <div className="topResultImg">
              <img src={topArtist?.images?.[2]?.url} alt="" />
            </div>
            <div className="topResultDetails">
              <p className="topResultName">{topArtist?.name}</p>
              <span className="topResultType">{topArtist?.type}</span>
            </div>
          </div>
        </Link>
      </div>
      <div className="searchDataSong">
        <h2 className="searchDataSongTitle">Songs</h2>
        {topTracks?.map((item, index) => (
          <TrackItem
            index={index}
            key={index}
            item={item}
            page={"searchTopTracks"}
          />
        ))}
      </div>
    </div>
  ) : (
    <SearchNoResult />
  );
};

export default SearchedTopTracks;
