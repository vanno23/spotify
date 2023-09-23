import { useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../Container/Container";
import "./Discography.scss";

const Discography = () => {
  const { artist_id } = useParams();

  const discographyTypes = [
    {
      label: "Popular releases",
      api: `artists/${artist_id}/albums?album_type=album,single&limit=10&market=US`,
    },
    {
      label: "Albums",
      api: `artists/${artist_id}/albums?album_type=album&limit=10`,
    },
    {
      label: "Singles and EPs",
      api: `artists/${artist_id}/albums?album_type=single&limit=10`,
    },
  ];

  const [selectedType, setSelectedType] = useState(discographyTypes[0]);

  return (
    <>
      <div className="discography">
        <h2 className="title">Discography</h2>
        <div className="discographyBtns">
          {discographyTypes.map((type) => (
            <button
              key={type.label}
              className={selectedType.label === type.label ? "active" : ""}
              onClick={() => setSelectedType(type)}
              aria-label={`Select ${type.label}`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>
      <Container api={selectedType.api} page="track" />
    </>
  );
};

export default Discography;
