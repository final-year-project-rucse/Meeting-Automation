import React, { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { useNavigate } from "react-router-dom";

const Committee = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ data: [] });
  const [query, setQuery] = useState("redux");
  const [show, setShow] = useState(false);
  const token = localStorage.getItem("token");
  console.log(token);
  useEffect(() => {
   
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/api/committees",
      {
        headers:{
          
          authorization: "Bearer " + token
        }
      }
      );

      setData(result.data);
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <header className="topbar">
        <div className="logo">
          <a href="#" className="mylogo text">
            Logo
          </a>
        </div>
        <nav className="navigation">
          <ul>
            <li>
              <a href="/addcommittee" className="text">
                Create committee
              </a>
            </li>
          </ul>
        </nav>
        <nav className="president">
          <button onClick={() => setShow(!show)}>Admin profile</button>
          {show && (
            <div className="dropdown-content">
              <ul>
                <li>
                  <a className="dropdown-content_a" href="/setting">
                    Setting
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      localStorage.setItem("token",null);
                      navigate("/admin");
                    }}
                  >
                    Log out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Committee</th>
          </tr>
        </thead>
        <tbody>
          {data.data.map((item, index) => (
            <TableRow key={index} item={item} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Committee;
