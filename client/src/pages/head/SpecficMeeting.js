import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";

const SpecficMeeting = () => {
  const params = useParams();
  const [flag, setFlag] = useState(false);
  const [meetingCredential, setMeetingCredential] = useState({});
  const [loading, setLoading] = useState(false);

  const getMeetingHandler = () => {
    setLoading(true);
    axios
      .get(`/${params.meetingName}/meetings/${params.meetingId}`)
      .then((res) => {
        setMeetingCredential(res.data.data[0]);
        setFlag(true);
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
    <div style={{width: "80%", margin: "2rem auto"}}>
        {loading && <p className="text-center">loading...........</p>}
      {flag && (
          <>
        <div>
          <p>{meetingCredential.title}</p>
          <p>{meetingCredential.date}</p>
          <p>{meetingCredential.time}</p>
          <p>{meetingCredential.location}</p>
        </div>
        <div>
            <h3>Agendas : </h3>
            {meetingCredential.agendas.map(el => <p key={el._id}>{el.text}</p>)}
        </div>
        <div>
            <h3>Resolutions : </h3>
            {meetingCredential.resolutions.map(el => <p key={el._id}>{el.title}</p>)}
        </div>
        <div>
            <h3>Attendess : </h3>
            {meetingCredential.attendess.map(el => <div style={{display: "flex"}} key={el._id}>
                <p style={{marginRight: '2rem'}}>{el.name}</p>
                <p>{el.email}</p>
            </div>)}
        </div>
        </>
      )}
    </div>
  );
};

export default SpecficMeeting;
