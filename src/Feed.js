import React, { Component } from "react";
import TweetBox from "./TweetBox.js";
import Post from "./Post.js";
import "./Feed.css";
import axios from "axios";
import Widgets from "./Widgets";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import Loading from "./Loading";

const Feed = (props) => {
  const [posts, postsHandler] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const url = "http://pazapp.ir/RecommendPost/SendRecomPost";
    const config = { headers: { Authorization: document.cookie.slice(14) } };
    axios.get(url, config).then((res) => {
      console.log(res.data);
      postsHandler(res.data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Sidebar myId={props.myId} />
      <div className="feed">
        <div className="feed_header">
          <h2>Home</h2>
        </div>
        <TweetBox />
        {loading ? (
          <Loading />
        ) : (
          posts.map((item, index) => (
            <Post
              text={item[0].message}
              username={item[0].UserName}
              key={index}
              image={item.image}
              postId={item[0].postId}
            />
          ))
        )}
      </div>
      <Widgets />
    </>
  );
};

export default Feed;
