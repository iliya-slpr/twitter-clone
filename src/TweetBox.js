import React from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import GifIcon from "@material-ui/icons/Gif";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import EventIcon from "@material-ui/icons/Event";
import CropOriginalIcon from "@material-ui/icons/CropOriginal";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { useState } from "react";
import axios from "axios";
import swal from "sweetalert";

function TweetBox() {
  let [tweetText, tweetTextHandler] = useState("");
  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox_input">
          <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />

          <div className="tweetBox_text">
            <input
              placeholder="What's up?!"
              type="text"
              onChange={(e) => {
                tweetTextHandler((tweetText = e.target.value));
              }}
            ></input>
          </div>
        </div>
        {/*           <input
            className="tweetBox_imageInput"
            placeholder="Optional: Enter image URL"
            type="text"
          ></input> */}
        <div className="tweetBox_footer">
          <CropOriginalIcon />
          <SentimentVerySatisfiedIcon />
          <EventIcon />
          <LocationOnIcon />
          <GifIcon />
        </div>
        <Button
          className="tweetBox_tweetButton"
          onClick={() => {
            let url = "http://pazapp.ir/Post/Posts";
            const formData = new FormData();
            formData.append("message", tweetText);
            const config = {
              headers: { Authorization: document.cookie.slice(14) },
            };
            axios.post(url, formData, config).then((res) => {
              swal("Ok", "Tweeted successfulluy", "info");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            });
          }}
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
