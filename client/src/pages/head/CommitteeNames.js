import React, { useState, useEffect } from "react";
import axios from "axios";
import TableRow from "./TableRow";
import { useNavigate } from "react-router-dom";

const CommitteeNames = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ data: [] });
  const token = localStorage.getItem("token");
  const headEmail = localStorage.getItem("headEmail");
  console.log(token);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:8000/api/committees", {
        headers: {
          authorization: "Bearer " + token,
          email:{headEmail}
        },
      });

      setData(result.data);
    };

    fetchData();
  }, []);
  console.log(data);
  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">My committees</th>
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

export default CommitteeNames;
