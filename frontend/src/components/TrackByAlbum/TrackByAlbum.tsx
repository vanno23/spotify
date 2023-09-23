import { useState, useEffect } from "react";
import spotifyApi from "../../api/spotifyApi";
import TrackItem from "../TrackItem/TrackItem";
import "./TrackByAlbum.scss";
import { albumTypes } from "../../GenericTypeScript/Album";
import { Link } from "react-router-dom";

const AlbumByTrack = ({ album_id }: any) => {
  const [albumData, setAlbumData] = useState<albumTypes>();

  useEffect(() => {
    if (album_id) {
      const fetchAlbum = async () => {
        const response = await spotifyApi.getBrowse(`albums/${album_id}`);
        setAlbumData(response);
      };
      fetchAlbum();
    }
  }, [album_id]);
  return (
    <div className="trackByAlbum">
      <Link to={`/album/${albumData?.id}`}>
        <div className="trackByAlbumHeader">
          <img src={albumData?.images[1].url} alt="albumImage" />
          <div>
            <p>From The album</p>
            <h4>{albumData?.name}</h4>
          </div>
        </div>
      </Link>
      {albumData?.tracks?.items?.map((item: any, index: any) => {
        return <TrackItem item={item} index={index} key={index} page="track" />;
      })}
    </div>
  );
};

export default AlbumByTrack;
