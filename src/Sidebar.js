import React from "react";
import "./Sidebar.css";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import ListAltIcon from "@material-ui/icons/ListAlt";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Button } from "@material-ui/core";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import YouTubeIcon from "@material-ui/icons/YouTube";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import { Link } from "react-router-dom";
import { useState } from "react";

function Sidebar({ myId }) {
  const ID = myId;
  return (
    <div className="sidebar">
      <h2 className="poggies">POGGIES...!</h2>

      <Link to="/">
        <SidebarOption Icon={HomeIcon} text="Home" />
      </Link>
      <Link to={`/user/${ID}`}>
        <SidebarOption Icon={PermIdentityIcon} text="Profile" />
      </Link>
      <Link to="/search">
        <SidebarOption Icon={SearchIcon} text="Explore" />
      </Link>
      <SidebarOption Icon={MailOutlineIcon} text="Messages" />
      <SidebarOption Icon={NotificationsNoneIcon} text="Notifications" />
      <SidebarOption Icon={BookmarkBorderIcon} text="Bookmarks" />
      <SidebarOption Icon={ListAltIcon} text="Lists" />
      <SidebarOption Icon={MoreHorizIcon} text="More" />

      {/* <Button variant="outlined" className="sidebar_tweet" fullWidth>
        Post
      </Button> */}
      <Button
        variant="outlined"
        className="sidebar_tweet"
        fullWidth
        onClick={() => {
          document.cookie =
            "Authorization=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          window.location.href = "/login";
        }}
      >
        Logout
      </Button>
      <div className="socialMedia">
        <h3>Follow us on:</h3>
        <div className="logos">
          <InstagramIcon fontSize="large" className="logos1" />
          <TwitterIcon fontSize="large" className="logos2" />
          <FacebookIcon fontSize="large" className="logos3" />
          <GitHubIcon fontSize="large" className="logos4" />
          <YouTubeIcon fontSize="large" className="logos5" />
          <SportsEsportsIcon fontSize="large" className="logos6" />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
