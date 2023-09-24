import GenericHeader from "../GenericHeader";
import { artistDataProps } from "../../GenericTypeScript/Artist";

interface ArtistHeaderProps {
  artistData: artistDataProps | null;
}
const ArtistHeader = ({ artistData }: ArtistHeaderProps) => {
  const customAboutArtist = (
    <div className="aboutAlbum">
      <h1 className="albumName">{artistData?.name}</h1>
      <p className="followers">
        Followers:{" "}
        {artistData?.followers?.total?.toLocaleString() || "Loading..."}
      </p>
    </div>
  );

  return (
    <GenericHeader
      imageUrl={artistData?.images?.[1]?.url || ""}
      customSection={customAboutArtist}
      page="artist"
      itemId={artistData?.id}
      itemType={artistData?.type}
    />
  );
};

export default ArtistHeader;
