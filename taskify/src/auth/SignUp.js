import React from "react";
import { func, string, bool } from "prop-types";

const SignUp = props => {
  const onSubmit = event => {
    event.preventDefault();
    props.onSignUp();
  };

  return (
    <div>
      <div className="col-md-6 col-md-offset-3">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title" style={{ textAlign: "center" }}>
              Sign up
            </h3>
          </div>
          <div className="panel-body">
            <form className="form-horizontal" onSubmit={onSubmit}>

              <div className="form-group">
                <div className="col-md-offset-2 col-md-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    onChange={props.onEmailChange}
                    value={props.email}
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
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password confirmation"
                    onChange={props.onPasswordConfirmationChange}
                    value={props.passwordConfirmation}
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
                    {props.isLoading ? "Signing Up" : "Sign Up"}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-offset-2 col-md-8">
                  <button
                    type="submit"
                    className="btn btn-default btn-block"
                    onClick={props.onGoBack}
                  >
                    Go back
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  onSignUp: func.isRequired,
  onGoBack: func.isRequired,
  onEmailChange: func.isRequired,
  onPasswordChange: func.isRequired,
  onPasswordConfirmationChange: func.isRequired,
  email: string,
  password: string,
  passwordConfirmation: string,
  isLoading: bool
};

export default SignUp;
