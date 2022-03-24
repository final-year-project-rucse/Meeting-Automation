import React, { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
  console.log(data);
  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
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
                  <Link to={`/${el.title}/meetings`}>View</Link>
                </td>
              </tr>
            ))}
         

          {/* {flag &&
            data.data.map((item, index) => (
              <TableRow key={index} item={item} index={index + 1} />
            ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default CommitteeNames;
