import React, { Component, useEffect, useState } from "react";
import "./Profile.css";
import { Button } from "@material-ui/core";
import axios from "axios";
import Post from "./Post";
import Sidebar from "./Sidebar";
import Widgets from "./Widgets";
import Swal from "sweetalert";
import EditModal from "./EditPhoto";
import EditProfile from "./EditProfile";
import Loading from "./Loading";
import { Suspense } from "react";

const Profile = (props) => {
  let [user, userHandler] = useState({});
  let [posts, postsHandler] = useState([]);
  const [showPhoto, setShowPhoto] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClosePhoto = () => setShowPhoto(false);
  const handleShowPhoto = () => setShowPhoto(true);
  const handleCloseProfile = () => setShowProfile(false);
  const handleShowProfile = () => setShowProfile(true);

  useEffect(() => {
    setLoading(true);
    if (props.id && props.me) {
      let url = "http://pazapp.ir/account/get_user_id";
      const formData = new FormData();
      formData.append("id", props.id);
      const config = {
        headers: { Authorization: document.cookie.slice(14) },
      };
      axios.post(url, formData, config).then((res) => {
        userHandler((user = res.data));
        const config = {
          headers: { Authorization: document.cookie.slice(14) },
        };
        let postsUrl = `http://pazapp.ir/Post/Posts?UserName=${user.username}`;
        axios.get(postsUrl, config).then((res) => {
          postsHandler((posts = res.data));
          // console.log(posts);
        });
        setLoading(false);
      });
    }
  }, [props.id]);
  const followHandler = () => {
    let url = "http://pazapp.ir/account/follow";
    const formData = new FormData();
    formData.append("id", props.id);
    const config = {
      headers: { Authorization: document.cookie.slice(14) },
    };
    axios.post(url, formData, config).then((res) => {
      if ((res.data.status = "success")) {
        Swal("success", res.data.message, "info");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        Swal("Error", res.data.message, "info");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  };
  return (
    <>
      <Sidebar myId={props.me.id} />
      <div className="profile">
        <div className="profile_header">
          <h2>Profile</h2>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            <EditModal show={showPhoto} onHide={handleClosePhoto} />
            <EditProfile show={showProfile} onHide={handleCloseProfile} />
            <div className="profile_container">
              <div className="profile_image">
                <img
                  src={`http://pazapp.ir${user.image}`}
                  onClick={handleShowPhoto}
                />
              </div>

              <div className="profile_name">
                <h2>{user.username}</h2>
              </div>

              <div className="profile_options">
                <Button className="followers_button">{`Followers: ${user.follower_num}`}</Button>
                <Button className="following_button">{`Following: ${user.following_num}`}</Button>
              </div>
              <div className="profile_options">
                {user.username == props.me.username ? (
                  <Button
                    className="edit_profile_button"
                    style={{ width: "80%" }}
                    onClick={handleShowProfile}
                  >
                    Edit Profile
                  </Button>
                ) : (
                  <Button style={{ width: "75%" }} onClick={followHandler}>
                    {user.isFollow == "true" ? "Unfollow" : "Follow"}
                  </Button>
                )}
                {/* <Button style={{ width: "75%" }}>Settings</Button> */}
              </div>
            </div>
            <div style={{ paddingTop: "4em" }}>
              {posts.map((item, index) => (
                <Post
                  text={item.message}
                  username={item.UserName}
                  key={index}
                  image={item.image}
                  postId={item.postId}
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Widgets />
    </>
  );
};

export default Profile;
