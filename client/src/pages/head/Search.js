import React, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../../axios/axios";

const Search = () => {
  const params = useParams();
  console.log(params.meetingName);
  const [searchInput, setSearchInput] = useState("");
  const [resolution, setResolution] = React.useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    axios
      .post(`/${params.meetingName}/query`, { data: searchInput })
      .then((res) => {
          console.log(res.data);
      })
      .catch((err) => {
          console.log(err.response);
      });
  };
  return (
    <div class="container">
      <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-md-8">
          <div class="search">
            <i class="fa fa-search"></i>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              class="form-control"
              placeholder="Have a question? Ask Now"
            />
            <button onClick={searchHandler} class="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
