import { Link } from "react-router-dom";
import "./FindArtist.scss";

interface FindArtistProps {
  showHideNavbar: boolean;
}
const FindArtist = ({ showHideNavbar }: FindArtistProps) => {
  return (
    <div className={`findSongs ${!showHideNavbar ? "findSongsHide" : ""}`}>
      <div className="findSongsHeader">
        <p>Let's find some artists to follow</p>
        <p>We'll keep you updated on new artists</p>
      </div>
      <div className="findSongsLink">
        <Link to="/search">Browse Artists</Link>
      </div>
    </div>
  );
};

export default FindArtist;
