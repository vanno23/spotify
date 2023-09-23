import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GenericHeader from "../components/GenericHeader";
import "./ProfilePage.scss";
import TrackItem from "../components/TrackItem/TrackItem";
import spotifyApi from "../api/spotifyApi";
import Container from "../components/Container/Container";
import ProfileDetailsModal from "../components/ProfileDetailsModal/ProfileDetailsModal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const ProfilePage = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { user_id } = useParams();
  const user = useSelector((state: any) => state.user);
  const likedItems = useSelector((state: any) => state.likeItems);
  const userData = user.user;
  const [trackData, setTrackData] = useState<any[]>();
  const [artistsData, setArtistsData] = useState<any>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const customAboutProfile = (
    <>
      <div className="aboutAlbum profileSection">
        <div>
          <p className="profileType">Profile</p>
        </div>

        <h1 className="profileName" onClick={() => setShowModal(true)}>
          {userData?.name}
        </h1>
        <div>
          <p className="userFollowing">
            {
              likedItems.likedItems.filter(
                (item: any) => item.itemType === "artist"
              ).length
            }{" "}
            Following
          </p>
        </div>
      </div>
    </>
  );

  useEffect(() => {
    const fetchLikedData = async () => {
      const trackItems = likedItems.likedItems.filter(
        (item: any) => item.itemType === "track"
      );

      const artistItems = likedItems.likedItems.filter(
        (item: any) => item.itemType === "artist"
      );

      const responses = await Promise.all(
        trackItems.map(async (item: any) => {
          return await spotifyApi.getBrowse(`tracks/${item.itemId}`);
        })
      );
      setTrackData(responses);
      const responsesArtists = await Promise.all(
        artistItems.map(async (item: any) => {
          return await spotifyApi.getBrowse(`artists/${item.itemId}`);
        })
      );
      setArtistsData(responsesArtists);
    };
    fetchLikedData();
  }, [likedItems.likedItems]);

  useEffect(() => {
    if (!user.user || user.user._id !== user_id) {
      navigate(redirect);
    }
  }, [navigate, redirect, user.user, user_id]);
  return (
    <>
      <Helmet>
        <title>{`Spotify - ${userData.name}`}</title>
      </Helmet>
      {showModal && (
        <ProfileDetailsModal
          userName={userData.name}
          setShowModal={setShowModal}
        />
      )}
      <div>
        <GenericHeader
          imageUrl=""
          page="profile"
          customSection={customAboutProfile}
        />
        <div className="profileLikedTracks">
          <h2 className="profileLikedTracksTitle">Liked tracks</h2>
          <p className="profileLikedTrackText">Only visible to you</p>
          {trackData?.map((item, index) => {
            return (
              <TrackItem key={index} item={item} index={index} page="profile" />
            );
          })}
        </div>
        <Container title="Following" page="profile" data={artistsData} />
      </div>
    </>
  );
};

export default ProfilePage;
