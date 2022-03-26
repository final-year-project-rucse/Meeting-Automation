import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { useParams, Link } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import SubNavigation from "../../components/navigation/SubNavigation";
import { Routes, Route, Outlet} from "react-router-dom"
import AddMembers from "./AddMembers";
import { useDispatch } from 'react-redux'
import { setAllMeetings} from '../../redux/head/HeadOneCommitteeAllMeeting'

const AllMeeting = () => {
  const dispatch = useDispatch()
  const params = useParams();

  const links = [
    {
      title: "Members",
      link: `/${params.meetingName}/addmembers`,
    },
    {
      title: "Create Meeting",
      link: `/${params.meetingName}/meetings/createMeeting`,
    },
  ];

  // const [allMeetings, setAllMeetings] = useState([]);
  const [loading, setLoading] = useState(false);

  const getMeetingHandler = () => {
    setLoading(true);
    axios
      .get(`/${params.meetingName}/meetings`)
      .then((res) => {
        dispatch(setAllMeetings(res.data.data))
        // setAllMeetings(res.data.data);
        setLoading(false);
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
    <>
      <div className="box_shadow_small">
        <Navigation links={links} isLinkSet={true} />
        <SubNavigation links={links} isLinkSet={true} />
      </div>

      <div style={{ width: "80%", margin: " 2rem auto" }}>
        <Outlet />
        {/* <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Serial No.</th>
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
        </table> */}
        {/* {loading && <p className="text-center">loading.........</p>} */}
      </div>
    </>
  );
};

export default AllMeeting;
