import { useState, useEffect } from "react";
import "./CopyRights.scss";
interface copyrightsProps {
  copyrights: { text: string }[];
  release_date: string;
}

const CopyRights = ({ copyrights, release_date }: copyrightsProps) => {
  const [newReleaseDate, setNewReleaseDate] = useState<string>();

  useEffect(() => {
    const date = new Date(release_date);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    setNewReleaseDate(formattedDate);
  }, [release_date]);

  return (
    <div className="copyRight">
      {copyrights?.map((item, index) => {
        return (
          <div key={index}>
            <p className="newReleaseDate">{newReleaseDate}</p>
            <p className="copyRightText">{item.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CopyRights;
