import React, { Component } from "react";
import { AlertList } from "react-bs-notifier";
import { connect } from "react-redux";

import { router } from "./misc/factory";
import { logout } from "./misc/redux/actions/user-actions";
import { fetchTasks } from "./misc/redux/actions/task-actions";
import { dismissAlert } from "./misc/redux/actions/alert-actions";

import Nav from "./misc/presentation/Nav";
import NotFound from "./misc/presentation/NotFound";
import Version from "./version/Version";

import MainContainer from "./main/MainContainer";
import LoginContainer from "./auth/LoginContainer";
import SignUpContainer from "./auth/SignUpContainer";

import { getSession } from "./misc/api";

class App extends Component {
  componentDidMount() {
    if (getSession()) this.props.fetchTasks();
  }

  mainViewForCurrentState() {
    if (router.match("/signup")) return <SignUpContainer />;
    else if (!getSession()) return <LoginContainer />;
    else if (router.match(/tasks/)) return <MainContainer />;
    else return <NotFound />;
  }

  render() {
    const { handleLogout, handleDismiss, alerts } = this.props;
    return (
      <div>
        <Nav user={getSession()} onLogout={handleLogout} />
        <AlertList alerts={alerts} onDismiss={handleDismiss} timeout={4000} />
        <div className="container">
          {this.mainViewForCurrentState()}
        </div>
        <Version />
      </div>
    );
  }
}

const mapStateToProps = ({ alerts }) => ({ alerts });

const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch(fetchTasks()),
  handleLogout: () => dispatch(logout()),
  handleDismiss: alert => dispatch(dismissAlert(alert))
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(App);
