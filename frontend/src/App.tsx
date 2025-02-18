import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./App.scss";
import NavBar from "./components/NavBar/NavBar";
import ArtistPage from "./pages/ArtistPage";
import TrackPage from "./pages/TrackPage";
import AlbumPage from "./pages/AlbumPage";
import PlaylistPage from "./pages/PlaylistPage";
import Footer from "./components/Footer/Footer";
import SearchPage from "./pages/SearchPage";
import Genre from "./pages/GenrePage";
import Login from "./pages/Login";
import LogginHeader from "./components/logginHeader/LogginHeader";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import { ToastContainer } from "react-toastify";
import SearchedDataPage from "./pages/SearchedDataPage";
import SearchedType from "./pages/SearchedType";

const App = () => {
  return (
    <>
      <ToastContainer />
      <div className="main">
        <NavBar />
        <div className="mainContent">
          <LogginHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/artist/:artist_id" element={<ArtistPage />} />
            <Route path="/track/:track_id" element={<TrackPage />} />
            <Route path="/album/:album_id" element={<AlbumPage />} />
            <Route path="/playlist/:playlist_id" element={<PlaylistPage />} />
            {/* <Route path="/genre/:genre_id" element={<Genre />} /> */}
            <Route path="/user/:user_id" element={<ProfilePage />} />
            <Route
              path="/search/:search_input"
              element={<SearchedDataPage />}
            />
            <Route
              path="/search/:search_input/:search_type"
              element={<SearchedType />}
            />
          </Routes>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
