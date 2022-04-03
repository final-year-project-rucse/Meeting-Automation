import React from 'react'
import axios from "axios";

const DeleteMember = ({ id, meetingName }) => {
  const deleteMemberHandler = () => {
    // console.log("------------------")
    // console.log(meetingName)
    // console.log(id)
    axios
      .delete(
        `http://localhost:8000/api/${meetingName}/deleteMember`,
        { id }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div>
      <button className="btn btn-danger btn-sm" onClick={deleteMemberHandler} >Delete</button>
    </div>
  )
}

export default DeleteMember