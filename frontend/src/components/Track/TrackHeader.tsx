import { tracksData } from "../../GenericTypeScript/Track";
import GenericHeader from "../GenericHeader";
import { Link } from "react-router-dom";
import "./TrackHeader.scss";
interface TracksHeaderProps {
  tracksData: tracksData | null;
  artistImage: string;
}

const TrackHeader = ({ tracksData, artistImage }: TracksHeaderProps) => {
  const customAboutTrack = (
    <div className="aboutAlbum">
      <p className="albumType">{tracksData?.type}</p>
      <h1 className="albumName">{tracksData?.name}</h1>
      <div className="headerDetails">
        <img
          className="artistImgSmall"
          src={artistImage}
          alt="artistImage"
          loading="lazy"
        />
        <Link
          className="artistName"
          to={`/${tracksData?.artists[0]?.type}/${tracksData?.artists[0]?.id}`}
        >
          {tracksData?.artists[0]?.name}
        </Link>
        <span>{tracksData?.album?.release_date.slice(0, 4)}</span>

        <span>
          {tracksData?.duration_ms && (
            <>
              {Math.floor(tracksData?.duration_ms / 60000)}:
              {Math.floor((tracksData?.duration_ms % 60000) / 1000)
                .toFixed(0)
                .padStart(2, "0")}
            </>
          )}
        </span>
      </div>
    </div>
  );

  return (
    <>
      <GenericHeader
        imageUrl={tracksData?.album?.images?.[1]?.url || ""}
        customSection={customAboutTrack}
        page="track"
        itemId={tracksData?.id}
        itemType={tracksData?.type}
        likedType="Track"
      />
      <div className="trackArtistContainer">
        <Link
          to={`/${tracksData?.artists[0]?.type}/${tracksData?.artists[0]?.id}`}
          className="trackArtist"
        >
          <img src={artistImage} alt="artistImage" loading="lazy" />
          <div>
            <p>{tracksData?.type}</p>
            <p className="trackArtistName">{tracksData?.artists[0]?.name}</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default TrackHeader;
