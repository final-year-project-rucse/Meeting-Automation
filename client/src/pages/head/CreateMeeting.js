import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateMeeting = () => {
  const navigate = useNavigate();
 
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [attendess, setAttendess] = useState([]);
  const [agendas, setAgendas] = useState([]);
  const [resolutions, setResolutions] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = {
      title: title,
      location: location,
      date: date,
      time: time,
      attendess: [],
      agendas: [],
      resolutions: []

    };
    console.log(data);
    await axios
      .post("http://localhost:8000/api/title1234455/addMeeting", data)
      .then((res) => {
        if(res.status == 200){
          // const {token} = res.data.data;
          // localStorage.setItem("token",token);
          // navigate("/co")
          console.log(res.statusText);
        }
      })
      .catch((err) => {
        console.log("=============");
        console.log(err);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="title"
        />
        <br />
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          placeholder="location"
        />
        <br />
        <input
          type="text"
          id="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          placeholder="date"
        />
        <br />
        <input
          type="text"
          id="time"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
          placeholder="time"
        />
        <br />
        {/* <input
          type="text"
          id="attendess"
          value={attendess}
          onChange={(e) => {
            setAttendess(e.target.value);
          }}
          placeholder="attendess"
        />
        <br />
        <input
          type="text"
          id="agendas"
          value={agendas}
          onChange={(e) => {
            setAgendas(e.target.value);
          }}
          placeholder="agendas"
        />
        <br />
        <input
          type="text"
          id="resolutions"
          value={resolutions}
          onChange={(e) => {
            setResolutions(e.target.value);
          }}
          placeholder="resolutions"
        /> */}
        <br />
        <button>add</button>
      </form>
    </div>
  );
};

export default CreateMeeting;
