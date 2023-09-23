import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import spotifyApi from "../api/spotifyApi";
import ContainerItem from "../components/ContainerItem/ContainerItem";
import "./SearchedType.scss";
import TrackSection from "../components/Album/TrackSection";

const SearchedType = () => {
  const { search_input, search_type } = useParams();
  const [searchedTypedData, setSearchedTypedData] = useState<any>();
  const [trackData, setTrackData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const sanitizedSearchType = search_type?.slice(0, -1);

  useEffect(() => {
    const fetchSearchedTypedData = async () => {
      if (search_type === "tracks") {
        const response = await spotifyApi.getBrowse(
          `search?q=${search_input}&type=track&limit=20`
        );
        setTrackData(response.tracks.items);
      } else {
        const response = await spotifyApi.getBrowse(
          `search?q=${search_input}&type=${sanitizedSearchType}&limit=20`
        );
        search_type && setSearchedTypedData(response[search_type].items);
      }

      setIsLoading(false); // Set loading state to false when data is fetched
    };

    fetchSearchedTypedData();
  }, [search_input, sanitizedSearchType, search_type]);

  return (
    <div className="searchedTypePage">
      {isLoading ? (
        <div className="loading-skeleton">Loading...</div>
      ) : search_type === "tracks" ? (
        <TrackSection trackData={trackData} page="searchedType" />
      ) : (
        <div className="searchedTypeGrid">
          {searchedTypedData?.map((item: any, index: number) => {
            return (
              <ContainerItem item={item} page={"searchedType"} key={index} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchedType;
