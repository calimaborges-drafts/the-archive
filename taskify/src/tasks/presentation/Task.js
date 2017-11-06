import React from "react";
import { shape, bool, func } from "prop-types";
import marked from "marked";
import { Link } from "capiroute";

import { taskShape } from "../task";
import { isCompleted, isPostponed } from "../task-types";

const treatBody = html => {
  let __html = marked(html);
  return { __html };
};

const TaskAction = ({ label, type, icon, isLoading, onClick }) => {
  let text = isLoading ? "Please wait..." : label;

  return (
    <Link
      style={{ margin: "0 5px" }}
      className={`btn btn-${type} pull-right`}
      href="/"
      disabled={isLoading}
      onClick={onClick}
    >
      <i className={`glyphicon glyphicon-${icon}`} /> {text}
    </Link>
  );
};

const Task = ({
  task,
  onComplete,
  isCompleting,
  onUncomplete,
  isUncompleting,
  onPostpone,
  isPostponing,
  onUnpostpone,
  isUnpostponing,
  onDelete,
  isDeleting,
  onEdit
}) => {
  const completedStyle = {
    textDecoration: isCompleted(task) ? "line-through" : "none"
  };
  const metaInfoStyle = {
    width: "100%",
    textAlign: "right",
    padding: "5px",
    fontSize: "8px",
    color: "#ccc",
    textDecoration: "none"
  };
  let panelBody = task.content;
  let showPanelHeading = true;

  if (!panelBody || panelBody.trim().length < 1) {
    panelBody = task.title || "";
    showPanelHeading = false;
  }

  let postponeButton = (
    <TaskAction
      label="Postpone"
      type="warning"
      icon="time"
      isLoading={isPostponing}
      onClick={() => onPostpone(task)}
    />
  );

  if (isPostponed(task)) {
    postponeButton = (
      <TaskAction
        label="Unpostpone"
        type="default"
        icon="minus"
        isLoading={isUnpostponing}
        onClick={() => onUnpostpone(task)}
      />
    );
  }

  let actionButton = (
    <TaskAction
      label="Complete"
      type="success"
      icon="ok"
      isLoading={isCompleting}
      onClick={() => onComplete(task)}
    />
  );

  if (task.completed) {
    actionButton = (
      <TaskAction
        label="Uncomplete"
        type="default"
        icon="minus"
        isLoading={isUncompleting}
        onClick={() => onUncomplete(task)}
      />
    );
  }

  let postponedTo = isPostponed(task)
    ? <div className="pull-right" style={{ color: "#888" }}>
        {"Will go to inbox " + task.postpone_date.fromNow()}
      </div>
    : null;

  return (
    <div className="panel panel-default">
      {showPanelHeading
        ? <div className="panel-heading" style={completedStyle}>
            <strong>{task.title}</strong>
          </div>
        : null}
      <div className="panel-body" style={completedStyle}>
        {postponedTo}
        <div dangerouslySetInnerHTML={treatBody(panelBody)} />
        {actionButton}
        {postponeButton}
        <TaskAction
          label="Delete"
          type="danger"
          icon="trash"
          isLoading={isDeleting}
          onClick={() => onDelete(task)}
        />
        <TaskAction
          label="Edit"
          type="default"
          icon="pencil"
          isLoading={false}
          onClick={() => onEdit(task)}
        />
      </div>
      <div style={metaInfoStyle}>
        {task._id} - owned by: {task.userid ? task.userid : "no one"}
      </div>
    </div>
  );
};

Task.propTypes = {
  task: shape(taskShape).isRequired,
  isDeleting: bool,
  onDelete: func.isRequired,
  isCompleting: bool,
  onComplete: func.isRequired,
  isPostponing: bool,
  onPostpone: func.isRequired,
  isUncompleting: bool,
  onUncomplete: func.isRequired,
  isUnpostponing: bool,
  onUnpostpone: func.isRequired,
  onEdit: func.isRequired
};

export default Task;
