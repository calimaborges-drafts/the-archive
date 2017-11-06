import React from "react";
import { shape, string, func } from "prop-types";
import { Link } from "capiroute";

const Nav = ({ onLogout, user }) => {
  const handleLogout = event => {
    event.preventDefault();
    onLogout();
  };

  const menu = (
    <div id="navbar" className="navbar-collapse collapse">
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link onClick={handleLogout}>Logout</Link>
        </li>
      </ul>
    </div>
  );
  return (
    <nav className="navbar navbar-inverse navbar-static-top">
      <div className="container">
        <div className="navbar-header">
          <button
            className="navbar-toggle collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbar"
            aria-expanded="false"
            aria-controls="navbar"
          >

            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
          <Link className="navbar-brand" to="/">Taskify</Link>
        </div>
        {user ? menu : null}
      </div>
    </nav>
  );
};

Nav.propTypes = {
  user: shape({ hash: string }),
  onLogout: func.isRequired
};

export default Nav;
