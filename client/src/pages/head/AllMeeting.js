import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { useParams, Link } from "react-router-dom";

const AllMeeting = () => {
  const params = useParams();
  console.log(params);

  const [allMeetings, setAllMeetings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMeetingHandler = () => {
    setLoading(true);
    axios
      .get(`/${params.meetingName}/meetings`)
      .then((res) => {
        setAllMeetings(res.data.data);
        setLoading(false);
        console.log(res.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });
  };
  useEffect(() => {
    getMeetingHandler();
  }, []);

  return (
    <div style={{ width: "80%", margin: " 2rem auto" }}>
      <a style={{ paddingRight: "30px" }} href={`/${params.meetingName}/addmembers`}>
        members
      </a>
      <a style={{ paddingLeft: "30px" }} href={`/${params.meetingName}/meetings/createMeeting`}>
        Create Meeting
      </a>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Meeting Names</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {allMeetings.map((el, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{el.title}</td>
              <td>
                <Link to={`/${params.meetingName}/meetings/${el._id}`}>
                  View
                </Link>
              </td>
              <td>Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p className="text-center">loading.........</p>}
    </div>
  );
};

export default AllMeeting;
