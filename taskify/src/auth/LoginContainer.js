import React, { Component } from "react";
import { connect } from "react-redux";

import { authenticate } from "../misc/redux/actions/user-actions";
import * as t from "../misc/redux/types";

import Login from "./Login";

class LoginContainer extends Component {
  state = {
    username: "",
    password: ""
  };

  handleLoginChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleLogin(event) {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.authenticate(username, password);
  }

  render() {
    const { loading } = this.props;
    return (
      <Login
        onLoginChange={this.handleLoginChange.bind(this)}
        onPasswordChange={this.handlePasswordChange.bind(this)}
        onLogin={this.handleLogin.bind(this)}
        login={this.state.username}
        password={this.state.password}
        isLoading={loading.type === t.AUTHENTICATE}
      />
    );
  }
}

const mapStateToProps = ({ loading }) => ({ loading });

const mapDispatchToProps = dispatch => ({
  authenticate: (username, password) =>
    dispatch(authenticate(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
