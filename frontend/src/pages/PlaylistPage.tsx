import { useState, useEffect } from "react";
import PlaylistHeader from "../components/Playlist/PlaylistHeader";
import { useParams } from "react-router-dom";
import spotifyApi from "../api/spotifyApi";
import { playlistTypes } from "../GenericTypeScript/Playlist";
import PlaylistTrack from "../components/Playlist/PlaylistTrack";
import { playlistPageTracksDataTypes } from "../GenericTypeScript/playlistPageTracksData";
import { Helmet } from "react-helmet-async";

const PlaylistPage = () => {
  const { playlist_id } = useParams();
  const [playlistData, setPlaylistData] = useState<playlistTypes>();
  const [playlistPageTracksData, setPlaylistPageTracksData] = useState<
    playlistPageTracksDataTypes[]
  >([]);
  const itemsPerPage = 30;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPlaylistData = async () => {
      const response = await spotifyApi.getBrowse(`playlists/${playlist_id}`);
      setPlaylistData(response);
    };
    fetchPlaylistData();
  }, [playlist_id]);

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        if (playlistPageTracksData.length <= 150) {
          const offset = (currentPage - 1) * itemsPerPage;
          const response = await spotifyApi.getBrowse(
            `playlists/${playlist_id}/tracks?limit=${itemsPerPage}&offset=${offset}`
          );
          setPlaylistPageTracksData([
            ...playlistPageTracksData,
            ...response.items,
          ]);
        }
      } catch (error) {
        console.error("Error fetching playlist tracks:", error);
      }
    };

    fetchPlaylistTracks();
  }, [playlist_id, currentPage]);

  useEffect(() => {
    const scrollContainer = document.querySelector(".mainContent");

    const handleScroll = () => {
      if (scrollContainer && scrollContainer?.scrollTop > 800 * currentPage) {
        setCurrentPage(currentPage + 1);
      }
    };

    scrollContainer?.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  if (!playlistData) {
    // Handle the case when playlistData is undefined
    return <div>Loading...</div>;
  }

  return (
    <>
      <Helmet>
        <title>{`${playlistData.name} - playlist by ${playlistData.owner.display_name} | Spotify`}</title>
      </Helmet>
      <PlaylistHeader playlistData={playlistData} />
      <PlaylistTrack playlistPageTracksData={playlistPageTracksData} />
    </>
  );
};

export default PlaylistPage;
