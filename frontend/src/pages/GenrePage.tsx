import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import spotifyApi from "../api/spotifyApi";
import ContainerItem from "../components/ContainerItem/ContainerItem";
import "./Genre.scss";
import { ContainerData } from "../components/Container/ContainerType";
import { Helmet } from "react-helmet-async";

const Genre = () => {
  const { genre_id } = useParams();
  const [genreData, setGenreData] = useState<ContainerData[]>([]);

  useEffect(() => {
    const fetchHomeItems = async () => {
      try {
        const response = await spotifyApi.getBrowse(
          `browse/categories/${genre_id}/playlists`
        );
        console.log(response); // ნახე, რა პასუხი გიბრუნდება
        setGenreData(response); // აქ response უნდა იყოს ისეთი, რომელიც გჭირდება
      } catch (error) {
        console.error("Error fetching genre data: ", error);
      }
    };
    fetchHomeItems();
  }, []);

  if (!genreData) {
    // Handle the case when artistData is undefined
    return <div>Loading...</div>;
  }

  return (
    <div className="genre">
      <Helmet>
        <title>Spotify - Genre</title>
      </Helmet>
      {genreData?.map((item, index) => (
        <ContainerItem item={item} page={"genre"} key={index} />
      ))}
    </div>
  );
};

export default Genre;
