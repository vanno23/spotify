import React, { useEffect, useState } from "react";
import spotifyApi from "../../api/spotifyApi";
import "./PopularTracks.scss";
import TrackItem from "../TrackItem/TrackItem";
import { PopularTracksProps } from "./PopularTracksProps";
import { tracksData } from "../../GenericTypeScript/Track";

const PopularTracks = ({ artistId, artistName, page }: PopularTracksProps) => {
  const [popularTracksData, setPopularTracksData] = useState<tracksData[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);

  useEffect(() => {
    const fetchTrack = async () => {
      const response = await spotifyApi.getBrowse(
        `artists/${artistId}/top-tracks?market=US`
      );
      setPopularTracksData(response.tracks);
    };
    fetchTrack();
  }, [artistId]);

  return (
    <div
      className={`popularTracksContainer ${
        page === "artist" ? "popularTracksPageArtist" : ""
      }`}
    >
      <div className="popularTracksHeader">
        {page === "artist" ? (
          <h2 className="artistPopular">Popular</h2>
        ) : (
          <>
            <h5>Popular Tracks by</h5>
            <h2>{artistName}</h2>
          </>
        )}
      </div>
      <div className="popularTracksItem">
        {popularTracksData.slice(0, showMore ? 10 : 5).map((item, index) => {
          return <TrackItem item={item} index={index} key={index} />;
        })}
      </div>
      <button onClick={() => setShowMore(!showMore)} className="toggleItem">
        {showMore ? "Show less" : "See more"}
      </button>
    </div>
  );
};

export default PopularTracks;
