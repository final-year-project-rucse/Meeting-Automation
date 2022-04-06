import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function Test(props) {
  const params = useParams();
  const { allMeetings } = useSelector((state) => state.head);

  const timeFormater = (time) => {
    var timeSplit = time.split(":"),
      hours,
      minutes,
      meridian;
    hours = timeSplit[0];
    minutes = timeSplit[1];
    if (hours > 12) {
      meridian = "PM";
      hours -= 12;
    } else if (hours < 12) {
      meridian = "AM";
      if (hours === 0) {
        hours = 12;
      }
    } else {
      meridian = "PM";
    }
    return hours + ":" + minutes + "   " + meridian;
  };

  return (
    <div style={{ width: "100%", margin: " 2rem auto" }}>
      <table className="table table-striped">
        <thead>
          <tr>
            <th className="ps-3" scope="col">
              Serial No.
            </th>
            <th scope="col">Meeting Names</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {allMeetings.map((el, i) => (
            <tr key={el._id}>
              <th className="ps-4" scope="row">
                {i + 1}
              </th>
              <td>{el.title}</td>
              <td>{el.date.substring(0, 10)}</td>
              <td>{timeFormater(el.time)}</td>
              <td>
                <div>
                  <Link
                    className="me-2"
                    to={`/${params.meetingName}/meetings/${el._id}`}
                  >
                    <button className="btn btn-primary btn-sm">View</button>
                  </Link>

                  {/* <button className="btn btn-danger btn-sm">Delete</button> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {loading && <p className="text-center">loading.........</p>} */}
    </div>
  );
}

export default Test;
