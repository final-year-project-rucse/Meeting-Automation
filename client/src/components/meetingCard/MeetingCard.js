import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";

const MeetingCard = (props) => {
  return (
    
        <div className="col-sm-6 col-md-4 meeting_card_container box_shadow_small">
          <div className="meeting_card_title_container">
            <p>{props.title}</p>
          </div>
          <div className="meeting_card_time_date_container">
            <p>
              {" "}
              <FontAwesomeIcon icon={faCalendar} /> <span>2022-03-26</span>{" "}
            </p>
            <p>
              {" "}
              <FontAwesomeIcon icon={faClock} /> <span>4:30 PM</span>{" "}
            </p>
          </div>
          <div className="meeting_card_bottom_container">
            <button>Delete</button>
            <Link to={props.link}>View </Link>
          </div>
        </div>
        
    //   </div>
    // </div>
  );
};

export default MeetingCard;
