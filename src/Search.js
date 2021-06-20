import React from "react";
import Sidebar from "./Sidebar";
import SearchIcon from "@material-ui/icons/Search";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import "./Search.css";
import Widgets from "./Widgets";
import axios from "axios";
import { useState } from "react";
import SearchItem from "./SearchItem";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const Search = (props) => {
  const [type, setType] = useState("user");
  const [keyword, setKeyword] = useState("");
  const [numinpages, setNuminpages] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState([]);
  const [limit, setLimit] = useState("10");
  const submitHandler = (pagenumber, init) => {
    setLoading(true);

    // Check Arguments
    console.log(keyword);
    console.log(type);
    console.log(pagenumber);
    console.log(limit);
    //

    const url = "http://pazapp.ir/account/search";
    const formData = new FormData();
    formData.append("serachfield", keyword);
    formData.append("type", type);
    formData.append("page_num", pagenumber);
    formData.append("page_size", limit);
    const config = {
      headers: { Authorization: document.cookie.slice(14) },
    };
    axios
      .post(url, formData, config)
      .then((res) => {
        if (res.data.result) {
          setResults(res.data.result);
          if (init) {
            let tmp = [];

            for (let i = 1; i <= res.data.pages; i++) {
              tmp.push(i);
            }
            setPages(tmp);
          }
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  };
  return (
    <>
      <Sidebar myId={props.me.id} />
      <div className="container">
        <div className="HeadSearch">
          <Form>
            <div className="searcher">
              <input
                type="text"
                placeholder="search"
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
            </div>
            <div className="filter">
              <div className="tabs">
                <div
                  className={`tab ${type === "user" ? "active" : ""}`}
                  onClick={() => setType("user")}
                >
                  <span>account</span>
                </div>
                <div
                  className={`tab ${type === "post" ? "active" : ""}`}
                  onClick={() => setType("post")}
                >
                  <span>post</span>
                </div>
                <div
                  className={`tab ${type === "hashtag" ? "active" : ""}`}
                  onClick={() => setType("hashtag")}
                >
                  <span>hashtag</span>
                </div>
              </div>
              <div className="action">
                <Button
                  className="submit"
                  onClick={() => {
                    submitHandler(numinpages, false);
                  }}
                >
                  search
                </Button>
              </div>
            </div>
          </Form>
        </div>

        {loading ? (
          <Loading />
        ) : (
          results.map((item, index) => (
            <Link to={`/user/${item.id}`}>
              <SearchItem
                avatar={item.image}
                username={item.username}
                bio={item.bi}
              />
            </Link>
          ))
        )}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyItem: "center",
            justifyContent: "center",
          }}
        >
          {pages.map((item, index) => (
            <Button
              className="pagination"
              onClick={() => {
                submitHandler(item, false);
              }}
              key={index}
            >
              <span>{item}</span>
            </Button>
          ))}
        </div>
      </div>
      <Widgets />
    </>
  );
};

export default Search;
