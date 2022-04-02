import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

const Navigation = (props) => {
  return (
    <div className="nav_container">
      <div className="nav_container_div">
        <div>
          <p>LOGO</p>
        </div>
        <div className="nav_container_links_container">
          {props.isLinkSet && (
            <div className="nav_container_all_link_div">
              {props.links.map((el, i) => (
                <div key={i} className="nav_container_single_link_div">
                  <Link to={el.link}>{el.title}</Link>
                </div>
              ))}
            </div>
          )}
          <button className="btn btn-outline-warning btn-sm">
            <FontAwesomeIcon className="px-2" icon={faArrowRightFromBracket} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
