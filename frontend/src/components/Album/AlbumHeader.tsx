import { useState, useEffect } from "react";
import GenericHeader from "../GenericHeader";
import { Link } from "react-router-dom";
import { albumTypes } from "../../GenericTypeScript/Album";
interface AlbumHeaeder {
  albumData: albumTypes;
  artistImage: string;
}
const AlbumHeader = ({ albumData, artistImage }: AlbumHeaeder) => {
  const [totalDuration, setTotalDuration] = useState({
    minutes: 0,
    seconds: 0,
  });

  const [windowWidth, setWindowWidth] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setWindowWidth(false);
      } else {
        setWindowWidth(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    let totalDuration =
      albumData?.tracks.items.reduce(
        (total, track) => total + track.duration_ms,
        0
      ) || 0;

    const minutes = Math.floor(totalDuration / 60000);
    const seconds = parseInt(
      Math.floor((totalDuration % 60000) / 1000).toFixed(0)
    );
    setTotalDuration({ minutes, seconds });

    if (window.innerWidth <= 600) {
      setWindowWidth(false);
    } else {
      setWindowWidth(true);
    }
  }, [albumData]);
  const customAboutAlbum = (
    <>
      <div className="aboutAlbum">
        <p className="albumType">{albumData?.type}</p>
        <h1 className="albumName">{albumData?.name}</h1>
        <div className="headerDetails">
          <img
            className="artistImgSmall"
            src={artistImage}
            alt="artistImage"
            loading="lazy"
          />
          <Link
            className="artistName"
            to={`/${albumData?.artists[0]?.type}/${albumData?.artists[0]?.id}`}
          >
            {albumData?.artists[0]?.name}
          </Link>
          <span>{albumData?.release_date.slice(0, 4)}</span>
          <span>{albumData?.total_tracks} songs</span>

          {windowWidth && (
            <p className="duration">
              , {totalDuration?.minutes} min {totalDuration?.seconds} sec
            </p>
          )}
        </div>
      </div>
    </>
  );

  return (
    <GenericHeader
      imageUrl={albumData?.images?.[1]?.url || ""}
      customSection={customAboutAlbum}
      page="track"
      likedType="Album"
      itemId={albumData?.id}
      itemType={albumData?.type}
    />
  );
};

export default AlbumHeader;
