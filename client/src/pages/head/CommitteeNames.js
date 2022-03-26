import React, { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";

const CommitteeNames = () => {
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState({ data: [] });
  const token = localStorage.getItem("headToken");
  const headEmail = localStorage.getItem("headEmail");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/head/committees", {
        headers: {
          authorization: "Bearer " + token,
          email: headEmail,
        },
      })
      .then((res) => {
        console.log(res.data);
        setData({ data: res.data.data });
        setFlag(true);
      })
      .catch((err) => {
        console.log(err.response);
      });
    // fetchData();
  }, []);

  return (
    <>
      <div className="box_shadow_small">
        <Navigation />
      </div>

      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Serial</th>
              <th scope="col">My committees</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {flag &&
              data.data.map((el, i) => (
                <tr key={el._id}>
                  <td>{i}</td>
                  <td>{el.title}</td>
                  <td>
                    <Link to={`/${el.title}`}>View</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommitteeNames;
