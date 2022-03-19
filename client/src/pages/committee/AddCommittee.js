import axios from "axios";
import Select from 'react-select';
import React, { useState } from "react";

const options = [{ value: "teacher1" ,label:"teacher1"}, { value: "teacher2",label:"teacher2" }];

const AddCommittee = () => {
  const [title, setTitle] = useState("");

  const [presidentName, setPresidentName] = useState(null);
  
  const handleSubmit = () => {
    const {value} = {presidentName};
    const data = {
      title: {title},
      presidentName: {value},
    };

    console.log({presidentName});
    console.log("===============================");
    console.log(data);
    
    axios
      .post("http://localhost:8000/api/addcommittee",data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      {/* <form onSubmit={handleSubmit}> */}
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
      <label>Select President</label>
      <Select 
        defaultValue={presidentName}
        onChange={setPresidentName}
        options={options}
      />
      <br />
      <button type="submit" value="Submit" onClick={handleSubmit}>
        Add
      </button>
      {/* </form> */}
    </div>
  );
};

export default AddCommittee;
