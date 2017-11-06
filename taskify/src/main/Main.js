import React from "react";
import { string } from "prop-types";

import { Link } from "capiroute";

import { kInbox, kCompleted, kPostponed } from "../tasks/task-types";

const Main = ({ children, type }) => {
  return (
    <div>
      <ul className="nav nav-pills">
        <li>
          <Link to="/tasks/new" keepQuery={true}>Add Task...</Link>
        </li>
        <li
          role="presentation"
          className={type === kPostponed ? "active" : null}
        >
          <Link queryTo={{ type: "postponed" }}>Postponed</Link>
        </li>
        <li
          role="presentation"
          className={!type || type === kInbox ? "active" : null}
        >
          <Link queryTo={{ type: "inbox" }}>Inbox</Link>
        </li>
        <li
          role="presentation"
          className={type === kCompleted ? "active" : null}
        >
          <Link queryTo={{ type: "completed" }}>Completed</Link>
        </li>
      </ul>
      {children}
    </div>
  );
};

Main.propTypes = {
  type: string
};

export default Main;
