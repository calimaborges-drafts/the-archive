import React from "react";
import { func, string, bool } from "prop-types";

import { Link } from "capiroute";

const Login = props => {
  return (
    <div>
      <div className="col-md-6 col-md-offset-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title" style={{ textAlign: "center" }}>
              Log in to your account
            </h3>
          </div>
          <div className="panel-body">
            <form className="form-horizontal" onSubmit={props.onLogin}>

              <div className="form-group">
                <div className="col-md-offset-2 col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Login"
                    onChange={props.onLoginChange}
                    value={props.login}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-md-offset-2 col-md-8">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={props.onPasswordChange}
                    value={props.password}
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="col-md-offset-2 col-md-8">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={props.isLoading}
                  >
                    {props.isLoading ? "Authorizing" : "Login"}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <div
                  className="col-md-offset-2 col-md-8"
                  style={{ textAlign: "center" }}
                >
                  <a className="btn btn-link" href="#">Forgot your password?</a>
                </div>
              </div>

              <div className="form-group">
                <div
                  className="col-md-offset-2 col-md-8"
                  style={{ textAlign: "center" }}
                >
                  <Link className="btn btn-link" to="/signup">Sign Up!</Link>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: func.isRequired,
  onLoginChange: func.isRequired,
  onPasswordChange: func.isRequired,
  login: string,
  password: string,
  isLoading: bool
};

export default Login;
