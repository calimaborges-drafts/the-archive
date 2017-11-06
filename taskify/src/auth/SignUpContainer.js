import React, { Component } from "react";
import { connect } from "react-redux";

import SignUp from "./SignUp";

import * as t from "../misc/redux/types";
import { signUp } from "../misc/redux/actions/user-actions";
import { router } from "../misc/factory";

class SignUpContainer extends Component {
  state = {
    email: "",
    password: "",
    passwordConfirmation: ""
  };

  handleChange(field) {
    return event =>
      this.setState({ ...this.state, [field]: event.target.value });
  }

  render() {
    const { loading, handleSignUp } = this.props;
    const { email, password, passwordConfirmation } = this.state;

    return (
      <SignUp
        onEmailChange={this.handleChange("email")}
        onPasswordChange={this.handleChange("password")}
        onPasswordConfirmationChange={this.handleChange("passwordConfirmation")}
        email={email}
        password={password}
        passwordConfirmation={passwordConfirmation}
        isLoading={loading.type === t.SIGNUP}
        onGoBack={() => router.goto("/")}
        onSignUp={() => handleSignUp(email, password, passwordConfirmation)}
      />
    );
  }
}

const mapStateToProps = ({ loading }) => ({ loading });

const mapDispatchToProps = dispatch => ({
  handleSignUp: (email, password, passwordConfirmation) =>
    dispatch(signUp(email, password, passwordConfirmation))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpContainer);
