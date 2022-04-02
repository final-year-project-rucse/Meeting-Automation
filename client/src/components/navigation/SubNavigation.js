import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";

const SubNavigation = (props) => {
  const params = useParams();
  //   console.log(window.location.reload(true))

  return (
    <div className="sec_nav_container border_top_1">
      <div className="sec_nav_container_div">
        <div>
          <p className="sec_nav_container_title">{params.meetingName}</p>
          <div className="sec_nav_link_container">
            {props.isLinkSet && (
              <div className="sec_nav_container_all_link_div">
                <div className="sec_nav_container_single_link_div">
                  <NavLink
                    to="."
                    className={(isActive) =>
                      isActive ? "activeClass" : "blue"
                    }
                  >
                    All Meeting
                  </NavLink>
                </div>
                {props.links.map((el, i) => (
                  <div key={i} className="nav_container_single_link_div">
                    <Link to={el.link}>{el.title}</Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default SubNavigation;
