import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios/axios";
import Navigation from "../../components/navigation/Navigation";

const SpecficMeeting = () => {
  const params = useParams();
  const [flag, setFlag] = useState(false);
  const [meetingCredential, setMeetingCredential] = useState({});
  const [loading, setLoading] = useState(false);

  const links = [
    {
      title: "Resolution",
      link: `/${params.meetingName}/meetings/${params.meetingId}/resolution`,
    },
    {
      title: "Add Resolutions",
      link: `/${params.meetingName}/meetings/${params.meetingId}/createResolution`,
    },
  ];

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
    <>
      <div className="box_shadow_small">
        <Navigation links={links} isLinkSet={true} />
      </div>

      <div style={{ width: "80%", margin: "2rem auto" }}>
        {loading && <p className="text-center">loading...........</p>}
        {flag && (
          <div className="container">
            <div>
              <h3>{meetingCredential.title}</h3>
              <p>
                <strong>Locations: </strong>
                {meetingCredential.location}
              </p>
              <span>
                <strong>Time and date: </strong>
                {meetingCredential.time} {meetingCredential.date.slice(0, 10)}
              </span>
            </div>
            <hr />
            <div>
              <h3>Agendas : </h3>
              <table class="table table-striped">
                <thead></thead>
                <tbody>
                  {meetingCredential.agendas.map((el, id) => (
                    <tr>
                      <td key={el._id}>
                        {" "}
                        {id + 1}
                        {". "}
                        {el.text}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <div>
              <h3>Resolutions : </h3>
              <table class="table table-striped">
                <thead></thead>
                <tbody>
                  {meetingCredential.resolutions.map((el, id) => (
                    <tr>
                      <td key={el._id}>
                        <strong>
                          {id + 1}
                          {". "}
                        </strong>
                        {el.title}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
            <div>
              <h3>Attendess : </h3>
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col-2">No</th>
                    <th scope="col-5">Name</th>
                    <th scope="col-5">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {meetingCredential.attendess.map((el, id) => (
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SpecficMeeting;
