import React from "react";
import { Link, withRouter } from "react-router-dom";

function Header(props) {
  const isActive = (path) => {
    if (props.history.location.pathname === path) {
      return { display: "none" };
    }
  };

  return (
    <div className="header">
      <div className="logo">
        <h3 className="logo-icon">o7 Arena</h3>
        <p className="logo-text">Home Of Historic Events</p>
      </div>
      <ul className="menuList">
        <li className="leftMenuItem" style={isActive("/")}>
          <Link to="/">Home</Link>
        </li>

        <li className="leftMenuItem" style={isActive("/signup")}>
          <Link to="/signup">Sign Up</Link>
        </li>

        <li style={isActive("/signin")}>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    </div>
  );
}

export default withRouter(Header);
