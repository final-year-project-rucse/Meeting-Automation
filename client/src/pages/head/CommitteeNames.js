import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navigation from "../../components/navigation/Navigation";
import { setAllMeetings } from "../../redux/head/HeadOneCommitteeAllMeeting";

const CommitteeNames = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [flag, setFlag] = useState(false);
  const [data, setData] = useState({ data: [] });
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("headToken");
  const headEmail = localStorage.getItem("headEmail");

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/v1/head/committees", {
        headers: {
          authorization: "Bearer " + token,
          email: headEmail,
        },
      })
      .then((res) => {
        setLoading(false);
        setData({ data: res.data.data });
        setFlag(true);
        dispatch(setAllMeetings([]));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response);
      });
    // fetchData();
  }, []);

  return (
    <>
      <div className="box_shadow_small">
        <Navigation />
      </div>

      <div className="container mt-5">
        {loading ? (
          <div className="text-center">
            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col ps-3">Serial No.</th>
                <th scope="col">My Committees</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {flag &&
                data.data.map((el, i) => (
                  <tr key={el._id}>
                    <td className="ps-3">{i + 1}</td>
                    <td>{el.title}</td>
                    <td>
                      <Link to={`/${el.title}`}>
                        <button className="btn btn-primary btn-sm">View</button>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default CommitteeNames;
