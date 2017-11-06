import React from "react";
import { connect } from "react-redux";

import * as t from "../misc/redux/types";
import {
  changeTaskForm,
  submitTaskForm,
  cancelTaskForm
} from "../misc/redux/actions/task-actions";
import TaskEditModal from "./presentation/TaskEditModal";

const TaskEditContainer = ({ loading, taskForm, dispatch }) => (
  <TaskEditModal
    modalTitle={taskForm && taskForm._id ? "Edit task" : "New task"}
    task={taskForm}
    isLoading={loading.type === t.SUBMIT_TASK}
    onCancel={() => dispatch(cancelTaskForm())}
    onSubmit={event => {
      event.preventDefault();
      dispatch(submitTaskForm());
    }}
    onChange={(field, value) => {
      dispatch(changeTaskForm(taskForm, field, value));
    }}
  />
);

const mapStateToProps = ({ loading, taskForm }) => ({ loading, taskForm });
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditContainer);
