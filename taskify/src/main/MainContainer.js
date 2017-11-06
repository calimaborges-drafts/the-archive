import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "./Main";
import TaskList from "../tasks/presentation/TaskList";
import LoadingView from "../misc/presentation/LoadingView";
import TaskEditContainer from "../tasks/TaskEditContainer";

import { router } from "../misc/factory";
import * as t from "../misc/redux/types";
import { fetchTasks } from "../misc/redux/actions/task-actions";

class MainContainer extends Component {
  componentDidMount() {
    this.props.fetchTasks();
  }

  render() {
    const { tasks, loading } = this.props;
    const { type } = router.getQueryString();

    if (loading.type === t.FETCH_TASKS) return <LoadingView />;
    return (
      <div>
        <Main type={type}>
          <TaskList tasks={tasks} type={type} />
          <TaskEditContainer />
        </Main>
      </div>
    );
  }
}

const mapStateToProps = ({ tasks, loading }) => ({ tasks, loading });

const mapDispatchToProps = dispatch => ({
  fetchTasks: () => dispatch(fetchTasks())
});

export default connect(mapStateToProps, mapDispatchToProps, null, {
  pure: false
})(MainContainer);
