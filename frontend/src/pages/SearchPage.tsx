import BrowseAll from "../components/BrowseAll/BrowseAll";
import History from "../components/History/History";
import { Helmet } from "react-helmet-async";

const SearchPage = () => {
  return (
    <>
      <Helmet>
        <title>Spotify - Search</title>
      </Helmet>
      <div style={{ marginTop: "72px" }}>
        <History />
        <BrowseAll />
      </div>
    </>
  );
};

export default SearchPage;
