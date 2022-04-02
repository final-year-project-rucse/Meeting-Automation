import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { createMeetingflagHandler } from "../../redux/head/HeadOneCommitteeAllMeeting";

const CreateMeeting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const [attendess, setAttendess] = useState([]);
  const [agendas, setAgendas] = useState([{ text: "" }]);
  const [resolutions, setResolutions] = useState([]);

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    let data = {
      title: title,
      location: location,
      date: date,
      time: time,
      agendas: agendas,
      resolutions: [],
    };

    await axios
      .post(`http://localhost:8000/api/${params.meetingName}/addMeeting`, data)
      .then((res) => {
        dispatch(createMeetingflagHandler());
        console.log(data);
        if (res.status === 200) {
          navigate(`/${params.meetingName}`);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("=============");
        console.log(err.response);
        setLoading(false);
      });
  };
  const handleChange = (e, key) => {
    const { name, value } = e.target;
    //console.log(value);
    const list = [...agendas];
    list[key][name] = value;
    setAgendas(list);
  };
  const handleOnadd = (e) => {
    e.preventDefault();
    setAgendas([...agendas, { text: "" }]);
  };
  const handleOnremove = (e, index) => {
    e.preventDefault();
    const list = [...agendas];
    list.splice(index, 1);
    setAgendas(list);
  };
  return (
    <div className="container-md">
      <div className="create_meeting_container pb-4">
        <p className="h2 text-center pt-5">Create New Meeting</p>
        <div className="container-lg">
          <form onSubmit={handleSubmit}>
            <div className="row row-cols-1 row-cols-md-2">
              <div className="col mt-3">
                <label className="form-label">Meeting Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  required
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Meeting Title"
                  className="form-control"
                />
              </div>
              <div className="col mt-3">
                <label className="form-label">Meeting Location</label>
                <input
                  type="text"
                  id="location"
                  value={location}
                  required
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  placeholder="Meeting Location"
                  className="form-control"
                />
              </div>
              <div className="col mt-3">
                <label className="form-label">Meeting Date</label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  required
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  placeholder="Meeting Title"
                  className="form-control"
                />
              </div>
              <div className="col mt-3">
                <label className="form-label">Meeting Time</label>
                <input
                  type="time"
                  id="time"
                  value={time}
                  required
                  onChange={(e) => {
                    setTime(e.target.value);
                  }}
                  placeholder="Meeting Title"
                  className="form-control"
                />
              </div>
            </div>

            <p className="h4 text-center pt-5">Agendas</p>
            {agendas.map((agenda, key) => {
              return (
                <div key={key}>
                  <div className="row align-items-end ">
                    <div className="col mt-3">
                      <label className="form-label">Agenda : {key + 1}</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        type="text"
                        name="text"
                        value={agenda.text}
                        placeholder="Write Agendas"
                        onChange={(e) => handleChange(e, key)}
                      ></textarea>
                    </div>
                    <div className="col-auto">
                      {agendas.length > 1 && (
                        <button
                          className="btn btn-danger me-3 btn-sm"
                          onClick={(e) => handleOnremove(e, key)}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      )}
                      {agendas.length - 1 === key && (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={handleOnadd}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <br />
            <div className="clearfix">
              <button className="btn btn-primary float-end">
                {loading && (
                  <div
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
                <span>Create</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;
