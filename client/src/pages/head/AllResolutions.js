import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { useParams, Link } from "react-router-dom";

const AllResolutions = () => {
    const params = useParams()
    const [allResolutions, setAllResolutions] = useState([])

    const getAllResolutionHanlder = () => {
        axios
        .get(
          `/${params.meetingName}/meetings/${params.meetingId}/resolutions`)
        .then((res) => {
            setAllResolutions(res.data.data)
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }

    useEffect(() => [
        getAllResolutionHanlder()
    ], [])
  return (
    <div>
        <div>
            <h4>Resolution: </h4>
            {allResolutions.map((el, i) => <p key={i}>{el.title}</p>)}
        </div>
    </div>
  )
}

export default AllResolutions