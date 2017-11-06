import React from "react";
import { string } from "prop-types";

const LoadingView = ({ message }) => (
  <div className="container"><h1>{message || "Loading..."}</h1></div>
);

LoadingView.propTypes = {
  message: string
};

export default LoadingView;
