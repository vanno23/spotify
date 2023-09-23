import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TrackItem from "../TrackItem/TrackItem";
import { tracksData } from "../../GenericTypeScript/Track";
import "./TrackSection.scss";
interface TrackSectionProps {
  trackData: tracksData[];
  page: string;
}
const TrackSection = ({ trackData, page }: TrackSectionProps) => {
  return (
    <div className="albumTrackSection">
      <div
        className={`trackHeaderTitle ${
          page === "searchedType" ? "searchedType" : ""
        }`}
      >
        <div>
          <span>#</span>
        </div>
        <div>
          <p>Title</p>
        </div>
        {page === "searchedType" && (
          <div>
            <span>Album</span>
          </div>
        )}
        <div className="clock">
          <button aria-label="clock icon">
            <AccessTimeIcon />
          </button>
        </div>
      </div>
      {trackData?.map((item, index) => (
        <TrackItem item={item} page={page} index={index} key={index} />
      ))}
    </div>
  );
};

export default TrackSection;
