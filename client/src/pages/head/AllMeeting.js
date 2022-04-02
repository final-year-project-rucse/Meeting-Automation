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
      <div className="box_shadow_medium">
        <Navigation links={links} isLinkSet={true} />
        <SubNavigation links={links} isLinkSet={true} />
      </div>

    <div style={{backgroundColor: "rgb(250, 250, 250)", width: "100%"}}>
    <div style={{ width: "80%", margin: " 0rem auto", padding: "2rem 0", backgroundColor: "rgb(250, 250, 250)" }}>
        <Outlet />
      </div>
    </div>
      
    </>
  );
};

export default AllMeeting;
