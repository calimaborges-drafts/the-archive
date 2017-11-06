import React from "react";
import { connect } from "react-redux";

import appInfo from "../../package.json";
import * as t from "../misc/redux/types";

const style = {
  position: "fixed",
  bottom: "5px",
  left: "5px",
  color: "#aaa",
  fontSize: "10px",
  backgroundColor: "rgba(255, 255, 255, 0.5)",
  margin: 0,
  padding: "5px",
  zIndex: 1000
};

const Version = ({ loading, status }) => {
  if (!status) status = { version: "offline", env: "" };
  if (loading && loading.type === t.FETCH_STATUS) {
    return <div />;
  }

  return (
    <div style={style}>
      backend
      {" "}
      {status.version}
      {" "}
      {status.heroku || ""}
      {" "}
      {status.env}
      {" "}
      - client
      {" "}
      {appInfo.version}
    </div>
  );
};

const mapStateToProps = ({ loading, status }) => ({
  loading,
  status
});

export default connect(mapStateToProps)(Version);
