import Container from "../components/Container/Container";
import { Helmet } from "react-helmet-async";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Spotify - Web Player: Music for everyone</title>
      </Helmet>
      <div style={{ paddingTop: "40px" }}>
        <Container
          title="Popular Artists"
          api="search?q=genre:pop&type=artist&limit=10"
          page="homePageArtist"
        />
        <Container
          title="Explore Electronic Music"
          api="search?type=artist&q=genre:electronic&limit=10"
          page="homePageArtist"
        />
        <Container
          title="Popular Rock Bands"
          api="search?q=genre:rock&type=artist&limit=10"
          page="homePageArtist"
        />
        <Container
          title="Popular New Releases"
          api="browse/new-releases?limit=10"
          page="homePageArtist"
        />
      </div>
    </>
  );
};

export default Home;
