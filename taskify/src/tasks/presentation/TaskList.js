import React from "react";
import { arrayOf, shape, string, func } from "prop-types";

import { taskShape } from "../task";

import {
  kInbox,
  kCompleted,
  kPostponed,
  isCompleted,
  isPostponed,
  isInbox
} from "../task-types";
import TaskContainer from "../TaskContainer";

const EmptyState = () => {
  return <h1>No tasks</h1>;
};

const byType = type => task => {
  switch (type) {
    case kCompleted:
      return isCompleted(task);
    case kPostponed:
      return isPostponed(task);
    case kInbox:
      return isInbox(task);
    default:
      return true;
  }
};

const TaskList = ({ tasks, type, ...taskProps }) => {
  tasks = tasks.filter(byType(type));

  return (
    <div style={{ marginTop: "10px" }}>
      {tasks && tasks.length > 0
        ? tasks.map(task => (
            <TaskContainer task={task} key={task._id} {...taskProps} />
          ))
        : <EmptyState />}
    </div>
  );
};

TaskList.propTypes = {
  tasks: arrayOf(shape(taskShape)).isRequired,
  type: string,
  onDelete: func
};

export default TaskList;
