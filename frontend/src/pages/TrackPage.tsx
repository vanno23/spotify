import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import spotifyApi from "../api/spotifyApi";
import { tracksData } from "../GenericTypeScript/Track";
import TrackHeader from "../components/Track/TrackHeader";
import PopularTracks from "../components/PopularTracks/PopularTracks";
import Container from "../components/Container/Container";
import TrackByAlbum from "../components/TrackByAlbum/TrackByAlbum";
import { Helmet } from "react-helmet-async";

const TrackPage = () => {
  const { track_id } = useParams();
  const [tracksData, setTracksData] = useState<tracksData | null>(null);
  const [artistImage, setArtistImage] = useState<string>("");

  useEffect(() => {
    const fetchArtisData = async () => {
      const response = await spotifyApi.getBrowse(`tracks/${track_id}`);
      setTracksData(response);

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
  }, [track_id]);

  if (!tracksData) {
    // Handle the case when artistData is undefined
    return <div>Loading...</div>;
  }

  const artist_id = tracksData?.artists[0]?.id;

  return (
    <div>
      <Helmet>
        <title>{`${tracksData.name} - song by ${tracksData.artists[0].name} | Spotify`}</title>
      </Helmet>
      <TrackHeader tracksData={tracksData} artistImage={artistImage} />
      <PopularTracks
        artistId={artist_id}
        artistName={tracksData?.artists[0]?.name}
        page="track"
      />
      <Container
        title="Popular releases"
        api={`artists/${artist_id}/albums?album_type=album,single&limit=20&market=US`}
        page="track"
      />
      <Container
        title="Albums"
        api={`artists/${artist_id}/albums?album_type=album&limit=20`}
        page="track"
      />
      <Container
        title="Singles and EPs"
        api={`artists/${artist_id}/albums?album_type=single&limit=20`}
        page="track"
      />

      <TrackByAlbum album_id={tracksData?.album?.id} />
    </div>
  );
};

export default TrackPage;
