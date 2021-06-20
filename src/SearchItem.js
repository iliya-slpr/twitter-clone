import React from "react";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import "./SearchItem.css";
function SearchItem(props) {
  return (
    <div className="post">
      <div className="post_avatar">
        <Avatar src={props.avatar} />
      </div>
      <div className="post_body">
        <div className="post_header">
          <div className="post_headerText">
            <h3>
              {props.username}
              <span>
                <VerifiedUserIcon className="post_badge" />
              </span>
            </h3>
          </div>
          <div className="post_headerDescription">
            <p>{props.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
