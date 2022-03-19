import React, { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "./TableRow";
const Committee = () => {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("redux");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://hn.algolia.com/api/v1/search?query=redux"
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div class="container">
      <header className="topbar">
        <div className="logo">
          <a href="#" className="mylogo text">
            Logo
          </a>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <a href="#" className="text">
                Create committee
              </a>
            </li>
          </ul>
        </nav>
        <nav className="president">
          <ul>
            <li>
              <a href="" className="text">
                Admin profile
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Committee</th>
          </tr>
        </thead>
        <tbody>
          {data.hits.map((item) => (
            <TableRow item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Committee;
