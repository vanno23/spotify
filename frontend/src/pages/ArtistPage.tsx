import { useEffect, useState } from "react";
import ArtistHeader from "../components/Artist/ArtistHeader";
import Container from "../components/Container/Container";
import { useParams } from "react-router-dom";
import spotifyApi from "../api/spotifyApi";
import { artistDataProps } from "../GenericTypeScript/Artist";
import PopularTracks from "../components/PopularTracks/PopularTracks";
import Discography from "../components/Artist/Discography";
import { Helmet } from "react-helmet-async";

const ArtistPage = () => {
  const { artist_id } = useParams();
  const [artistData, setArtistData] = useState<artistDataProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        const artistResponse = await spotifyApi.getBrowse(
          `artists/${artist_id}`
        );
        setArtistData(artistResponse);
      } catch (error) {
        setError("Failed to fetch artist data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtistData();
  }, [artist_id]);

  return (
    <>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : error || !artistData ? (
          <div>Error: {error}</div>
        ) : (
          <>
            <Helmet>
              <title>{`${artistData.name} | Spotify`}</title>
            </Helmet>
            <ArtistHeader artistData={artistData} />
            <PopularTracks
              artistId={artist_id}
              artistName={artistData.name}
              page="artist"
            />
            <Discography />
            <Container
              title="Fans also like"
              api={`artists/${artist_id}/related-artists`}
              page="artist"
            />
            <Container
              title="Appears On"
              api={`artists/${artist_id}/albums?album_type=appears_on&market=US&limit=10`}
              page="track"
            />
            <Container
              title="Artist Playlists"
              api={`search?type=playlist&q=${encodeURIComponent(
                artistData?.name
              )}&limit=10`}
              page="playlist"
            />
          </>
        )}
      </div>
    </>
  );
};

export default ArtistPage;
