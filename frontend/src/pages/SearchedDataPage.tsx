import Container from "../components/Container/Container";
import { useParams } from "react-router-dom";
import SearchedTopTracks from "../components/SearchedTopTracks/SearchedTopTracks";
import "./SearchedDataPage.scss";
const SearchedDataPage = () => {
  const { search_input } = useParams();

  return (
    <div className="searchedDataPage">
      <SearchedTopTracks />
      <Container
        title="Artists"
        api={`search?q=${search_input}&type=artist&limit=10`}
        page="searchedDataPage"
      />
      <Container
        title="Albums"
        api={`search?q=${search_input}&type=album&limit=10`}
        page="searchedDataPage"
      />
      <Container
        title="Playlists"
        api={`search?q=${search_input}&type=playlist&limit=10`}
        page="searchedDataPage"
      />
    </div>
  );
};

export default SearchedDataPage;
