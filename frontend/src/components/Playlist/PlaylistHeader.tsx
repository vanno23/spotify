import { playlistTypes } from "../../GenericTypeScript/Playlist";
import GenericHeader from "../GenericHeader";
import { Link } from "react-router-dom";
import TrackDefaultImage from "../../images/TrackDefaultImage.png";

interface playlistProps {
  playlistData: playlistTypes;
}

const PlaylistHeader = ({ playlistData }: playlistProps) => {
  const customAboutPlaylist = (
    <div className="aboutAlbum">
      <p className="albumType">{playlistData?.type}</p>
      <h1 className="albumName">{playlistData?.name}</h1>
      <div className="headerDetails">
        <img
          className="artistImgSmall"
          src={playlistData?.images?.[0]?.url || TrackDefaultImage}
          alt="artistImage"
          loading="lazy"
        />
        <Link
          className="artistName"
          to={`/${playlistData?.owner?.type}/${playlistData?.owner?.id}`}
        >
          {playlistData?.owner?.display_name}
        </Link>
        <span>
          {" "}
          {`${playlistData?.followers.total.toLocaleString()}`} likes
        </span>
        <span>{playlistData?.tracks?.total} songs</span>
      </div>
    </div>
  );

  return (
    <GenericHeader
      imageUrl={playlistData?.images[0]?.url}
      customSection={customAboutPlaylist}
      page="track"
      likedType="Playlist"
      itemId={playlistData?.id}
      itemType={playlistData?.type}
    />
  );
};

export default PlaylistHeader;
