import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import spotifyApi from "../api/spotifyApi";
import AlbumHeader from "../components/Album/AlbumHeader";
import TrackSection from "../components/Album/TrackSection";
import { albumTypes } from "../GenericTypeScript/Album";
import CopyRights from "../components/Copyrights/CopyRights";
import Container from "../components/Container/Container";
import { Helmet } from "react-helmet-async";

const AlbumPage = () => {
  const { album_id } = useParams();
  const [albumData, setAlbumData] = useState<albumTypes>();
  const [artistImage, setArtistImage] = useState<string>("");

  useEffect(() => {
    const fetchArtisData = async () => {
      const response = await spotifyApi.getBrowse(`albums/${album_id}`);
      setAlbumData(response);
      const response2 = await spotifyApi.getBrowse(
        `artists/${response.artists[0].id}`
      );
      setArtistImage(response2.images[2].url);
    };
    const container: Element | null = document.querySelector(".mainContent");
    if (container) {
      container.scrollTop = 0;
    }
    fetchArtisData();
  }, [album_id]);

  if (!albumData) {
    // Handle the case when artistData is undefined
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{`${albumData.name} - Album by ${albumData.artists[0].name} | Spotify`}</title>
      </Helmet>
      <AlbumHeader albumData={albumData} artistImage={artistImage} />
      <TrackSection trackData={albumData?.tracks?.items} page={"track"} />
      <CopyRights
        copyrights={albumData?.copyrights}
        release_date={albumData?.release_date}
      />
      <Container
        title={`More by ${albumData?.artists[0]?.name}`}
        api={`artists/${albumData?.artists[0]?.id}/albums`}
        page="album"
      />
    </>
  );
};

export default AlbumPage;
