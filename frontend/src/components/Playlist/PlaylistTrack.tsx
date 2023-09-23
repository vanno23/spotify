import "./PlaylistTrack.scss";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { playlistPageTracksDataTypes } from "../../GenericTypeScript/playlistPageTracksData";
import PlaylistTrackList from "./PlaylistTrackList";

interface playlistPageTracksDataProps {
  playlistPageTracksData: playlistPageTracksDataTypes[];
}
const PlaylistTrack = ({
  playlistPageTracksData,
}: playlistPageTracksDataProps) => {
  return (
    <div className="playlistTrack">
      <div className="trackHeaderTitle">
        <span>#</span>
        <p>Title</p>
        <p>Album</p>
        <p>Date Added</p>

        <div className="clock">
          <button aria-label="clock icon">
            <AccessTimeIcon />
          </button>
        </div>
      </div>
      {playlistPageTracksData?.map((item, index) => {
        return <PlaylistTrackList key={index} item={item} index={index} />;
      })}
    </div>
  );
};

export default PlaylistTrack;
