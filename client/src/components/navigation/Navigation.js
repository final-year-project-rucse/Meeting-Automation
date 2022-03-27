import React from "react";
import { Link } from "react-router-dom";

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

          <div className="nav_container_head_div">
            <p className="nav_container_head_name">
              {localStorage.getItem("headEmail")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
