import React, { useState, useEffect } from "react";
import TableRow from "./TableRow";
import { useParams } from "react-router-dom";
import axios from "axios";
const committeeMembers = ["Rakib", "Ebrahim", "Bepul"];

const CommitteeName = () => {
  const params = useParams();
  const [members, setMembers] = useState([]);
  const url = `http://localhost:8000/api/${params.committeeName}`;
  const addMembers = "/" + params.committeeName + "/addMembers"
  useEffect(() => {
    const fetchData = async() => {
      const response = await axios.get(url);
      console.log(response)
      setMembers(response.data.data);
    };
   
    fetchData();
  }, []);
  return (
    <div className="container">
      {/* <ul className="head_committee">
        <li>
          <a href="/head/createMeeting">Create Meeting</a>
        </li>
        <li>
          <a href={addMembers}> Add member</a>
        </li>
      </ul> */}
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Committee Names</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((item, index) => (
            <TableRow key={index} item={item.name} index={index + 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CommitteeName;
