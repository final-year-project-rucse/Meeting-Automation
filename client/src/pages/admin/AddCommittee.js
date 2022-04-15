import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AddCommittee = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");

  const [options, setOptions] = useState([
    { name: "select an option", email: "" },
  ]);
  const url = "http://localhost:8000/api/admin/teachers";
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(url);
      var arr = [];
      arr = options.concat(response.data.data);
      setOptions(arr);
    };
    fetchData();
  }, []);
  const [index, setInput] = useState(0);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      title: title,
      presidentName: options[index].name,
      email: options[index].email,
    };

    await axios
      .post("http://localhost:8000/api/addcommittee", data)
      .then((res) => {
        console.log(res);
        navigate("/committees");
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
          value={index}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        >
          {options.map((obj, index) =>
            index === 0 ? (
              <option key={obj.name} value={index} defaultValue hidden>
                {obj.name}{" "}
              </option>
            ) : (
              <option key={obj.name} value={index}>
                {obj.name}{" "}
              </option>
            )
          )}
        </select>
        <br />
        <button>add</button>
      </form>
    </div>
  );
};

export default AddCommittee;
