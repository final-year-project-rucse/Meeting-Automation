import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const CreateMeeting = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [attendess, setAttendess] = useState([]);
  const [agendas, setAgendas] = useState([{ text: "title test" }]);
  const [resolutions, setResolutions] = useState([]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = {
      title: title,
      location: location,
      date: date,
      time: time,
      agendas: agendas,
      resolutions: []

    };
  
    // console.log(data);
    console.log(params.meetingName);
    await axios
      .post(`http://localhost:8000/api/${params.meetingName}/addMeeting`, data)
      .then((res) => {
        console.log(data);
        if (res.status === 200) {

          navigate(`/${params.meetingName}/meetings`);
        }
      })
      .catch((err) => {
        console.log("=============");
        console.log(err);
      });
  };
  const handleChange = (e,key) =>{
    const {name,value} = e.target;
    //console.log(value);
    const list = [...agendas];
    list[key][name] = value;
    setAgendas(list);
  }
  const handleOnadd = (e) =>{
    e.preventDefault();
    setAgendas([...agendas,{text:""}])
  }
  const handleOnremove = (e,index) =>{
    e.preventDefault();
   const list = [...agendas];
    list.splice(index,1);
    setAgendas(list);
  }
  return (
    <div className="container">
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
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
        <br />
        <label>Location:</label>
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
        <br />
        <label>Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          placeholder="date"
        />
        <br />
        <br />
        <label>Time:</label>
        <input
          type="time"
          id="time"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
          placeholder="time"
        />
        <br />
        <br />
        <label>Agendas:</label>
        {
          agendas.map((agenda, key) => {
            return (
              <div key={key}>
                <label>Tilte:</label>
                <input
                  type="text" 
                  name="text" 
                  value={agenda.text} 
                  placeholder="Enter title"
                  onChange={ (e)=> handleChange(e,key)}
                  
                />
                {
                  agendas.length >1 &&
                  
                  <button onClick={(e) => handleOnremove(e,key)}>remove</button> 
                }
                {agendas.length-1 == key &&<button onClick={handleOnadd}>add</button>}
                <br />
                <p>{JSON.stringify(agendas)}</p>
              </div>

            )
          })
        }
        <br />
        <br />
        <button>add</button>
      </form>
    </div>
  );
};

export default CreateMeeting;
