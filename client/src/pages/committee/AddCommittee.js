import axios from "axios";
import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

const options = [
  { value: "teacher1", label: "teacher1" },
  { value: "teacher2", label: "teacher2" },
];

const AddCommittee = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const [presidentName, setPresidentName] = useState(options[0].value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      title: title,
      presidentName: presidentName,
    };
    console.log(data);

    await axios
      .post("http://localhost:8000/api/addcommittee", data)
      .then((res) => {
        console.log(res);
        navigate("/committees")
      })
      .catch((err) => {
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
        <select
          value={presidentName}
          onChange={(e) => {
            setPresidentName(e.target.value);
          }}
        >
          {options.map((obj) => (
            <option key={obj.value} value={obj.value}>
              {obj.value}{" "}
            </option>
          ))}
        </select>
        <br />
        <button>add</button>
      </form>
    </div>
  );
};

export default AddCommittee;
