import React from "react";
import { shape } from "prop-types";
import { connect } from "react-redux";

import { taskShape } from "./task";
import { router } from "../misc/factory";
import {
  completeTask,
  uncompleteTask,
  deleteTask,
  postponeTask,
  unpostponeTask
} from "../misc/redux/actions/task-actions";
import * as t from "../misc/redux/types";

import Task from "./presentation/Task";

const TaskContainer = props => {
  const { dispatch, loading, task } = props;
  return (
    <Task
      task={task}
      isCompleting={
        loading.type === t.COMPLETE_TASK && loading.task._id === task._id
      }
      onComplete={task => dispatch(completeTask(task))}
      isUncompleting={
        loading.type === t.UNCOMPLETE_TASK && loading.task._id === task._id
      }
      onUncomplete={task => dispatch(uncompleteTask(task))}
      isDeleting={
        loading.type === t.DELETE_TASK && loading.task._id === task._id
      }
      onDelete={task => dispatch(deleteTask(task))}
      isPostponing={
        loading.type === t.POSTPONE_TASK && loading.task._id === task._id
      }
      onPostpone={task => dispatch(postponeTask(task))}
      isUnpostponing={
        loading.type === t.UNPOSTPONE_TASK && loading.task._id === task._id
      }
      onUnpostpone={task => dispatch(unpostponeTask(task))}
      onEdit={task => router.goto(`/tasks/edit/${task._id}`)}
    />
  );
};

TaskContainer.propTypes = {
  task: shape(taskShape)
};

const mapStateToProps = ({ loading }) => ({ loading });
const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(TaskContainer);
