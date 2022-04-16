import React from "react";
import { Link } from "react-router-dom";
const DemoHome = () => {
  return (
    <div className="container">
      <p className="h1 mt-5">Meeting Automation</p>
      <p className="display-4 demo_page_login">Login</p>
      <div className="row">
        <div className="demo_home_login_container">
          <div className="demo_home_first_login">
            <p className="h4 mb-3">For Admin</p>
            <p>
              Admin is who can create committe and invite a head.
            </p>
            <Link to="/admin" className="demo_home_button mt-4">
              Login
            </Link>
          </div>
          <div className="demo_home_second_login">
            <p className="h4 mb-3">For Head</p>
            <p>
            Head is who can create meeting, add resolutions and invite to meeting members.
            </p>
            <Link to="/head/login" className="demo_home_button mt-4">
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="demo_copyright text-center">Copyright © 2022 Meeting Automation</div>
    </div>
  );
};

export default DemoHome;
