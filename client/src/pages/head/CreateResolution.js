import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../axios/axios";

const CreateResolution = () => {
  const params = useParams();
  const navigation = useNavigate();
  console.log(params);
  const [resolutions, setResolutions] = useState([]);
  const inputHandler = (e, index) => {
    const { name, value } = e.target;
    const copyResolution = [...resolutions];
    let singleResolution = copyResolution[index];
    singleResolution[name] = value;
    setResolutions(copyResolution);
  };
  const addNewResolutionHandler = () => {
    const singleResolution = { title: "" };
    const copyResolution = [...resolutions];
    copyResolution.push(singleResolution);
    setResolutions(copyResolution);
  };
  const deleteResolution = (position) => {
    const copyResolution = [...resolutions];
    copyResolution.splice(position, 1);
    setResolutions(copyResolution);
  };

  const submitHandler = () => {
    let finalObj = {
      resolutions: resolutions,
    };
    console.log(finalObj);
    axios
      .post(
        `/${params.meetingName}/meetings/${params.meetingId}/addResolution`,
        finalObj
      )
      .then((res) => {
        navigation(`/${params.meetingName}/meetings/${params.meetingId}/resolution`)
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div style={{ width: "80%", margin: "2rem auto" }}>
      <button onClick={addNewResolutionHandler}>Add</button>
      {resolutions.map((el, i) => (
        <div key={i}>
          <input
            placeholder="Resolution"
            name="title"
            value={el.title}
            onChange={(e) => inputHandler(e, i)}
          />
          <button onClick={() => deleteResolution(i)}>Delete</button>
        </div>
      ))}
      <br></br>
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
};

export default CreateResolution;
