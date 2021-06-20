import React, { useState, useEffect } from "react";
import "./Post.css";
import axios from "axios";
import { Avatar } from "@material-ui/core";
import Close from "@material-ui/icons/Close";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import Loading from "./Loading";

function Post({
  displayName,
  username,
  verified,
  text,
  image,
  avatar,
  postId,
}) {
  const [commentAccess, setCommentAccess] = useState(false);
  const [commentText, setCommentText] = useState(null);
  const [liked, likeHandler] = useState(false);
  const [comments, commentsHandler] = useState([]);
  const [likers, likersHandler] = useState([]);
  const [showLikers, showLikersHandler] = useState(false);
  const [commentLoading, setCommentLoading] = useState(false);
  useEffect(() => {
    let url = `http://pazapp.ir/Post/ExtLike?PostId=${postId}`;
    const config = {
      headers: { Authorization: document.cookie.slice(14) },
    };
    axios.get(url, config).then((res) => {
      likeHandler(res.data === "True" ? true : false);
      console.log(liked);
    });
  }, [liked]);

  useEffect(() => {
    likersMethod();
  }, []);
  const likersMethod = () => {
    let url = `http://pazapp.ir/Post/Like?PostId=${postId}`;
    const config = {
      headers: { Authorization: document.cookie.slice(14) },
    };
    axios.get(url, config).then((res) => {
      likersHandler(res.data === "" ? [] : res.data);
    });
  };
  const likeBtnHandler = () => {
    let url = `http://pazapp.ir/Post/Like`;
    var data = new FormData();
    data.append("PostId", postId);
    var config = {
      method: liked ? "delete" : "post",
      url: "http://pazapp.ir/Post/Like",
      headers: { Authorization: document.cookie.slice(14) },
      data: data,
    };
    data.append("PostId", postId);
    axios(config).then((res) => {
      if (res.data.includes("POST")) likeHandler(true);
      if (res.data.includes("DELETE")) likeHandler(false);
      likersMethod();
    });
  };
  const sendComment = (text) => {
    let url = `http://pazapp.ir/Post/Replays`;
    const config = {
      headers: { Authorization: document.cookie.slice(14) },
    };
    var data = new FormData();
    data.append("mainPost", postId);
    data.append("message", commentText);
    axios.post(url, data, config).then((res) => console.log(res));

    // Close CommentBox
    setTimeout(() => {
      setCommentText(null);
      setCommentAccess(false);
    }, 200);
  };
  const commentLoader = () => {
    setCommentAccess(true);
    setCommentLoading(true);
    let url = `http://pazapp.ir/Post/Replays?mainPost=${postId}`;
    const config = {
      headers: { Authorization: document.cookie.slice(14) },
    };
    axios
      .get(url, config)
      .then((res) => {
        commentsHandler(res.data == "Does not exist" ? [] : res.data);
        setCommentLoading(false);
      })
      .catch((e) => setCommentLoading(false));
  };
  const likersRequest = () => {
    showLikersHandler(true);
    let url = `http://pazapp.ir/Post/Like?PostId=${postId}`;
    const config = {
      headers: { Authorization: document.cookie.slice(14) },
    };
    axios.get(url, config).then((res) => {
      likersHandler(res.data == "" ? [] : res.data);
    });
  };
  return (
    <div className="post">
      <div className="post_avatar">
        <Avatar src={image} />
      </div>
      <div className="post_body">
        <div className="post_header">
          <div className="post_headerText">
            <h3>
              {username}
              <span>
                <VerifiedUserIcon className="post_badge" />
              </span>
            </h3>
          </div>
          <div className="post_headerDescription">
            <p>{text}</p>
          </div>
        </div>
        <div className="post_footer">
          {commentAccess ? (
            <Close
              className="close_comment"
              fontSize="small"
              onClick={() => setCommentAccess(false)}
            />
          ) : (
            <ChatBubbleOutlineIcon fontSize="small" onClick={commentLoader} />
          )}
          <RepeatIcon fontSize="small" />
          <div style={{ position: "relative" }}>
            <FavoriteBorderIcon
              fontSize="small"
              style={{ color: liked ? "red" : "" }}
              onClick={likeBtnHandler}
              onMouseOver={likersRequest}
              onMouseOut={() => showLikersHandler(false)}
            />
            {likers.length}
            <div
              style={{
                display: showLikers ? "flex" : "none",
                backgroundColor: "#610979",
                color: "white",
                width: "5em",
                flexDirection: "column",
                position: "absolute",
                top: "2em",
              }}
            >
              {likers.map((item, index) => (
                <div key={index}>{item.UserName}</div>
              ))}
            </div>
          </div>
          <PublishIcon fontSize="small" />
        </div>
        {commentAccess && (
          <div className="commentBox">
            {commentLoading ? (
              <Loading />
            ) : (
              comments.map((item, index) => (
                <Post
                  text={item.message}
                  username={item.UserName}
                  key={index}
                  image={item.image}
                  postId={item.subPost}
                />
              ))
            )}
            <textarea
              type="text"
              placeholder="comment text ..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button className="send" onClick={() => sendComment(commentText)}>
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
