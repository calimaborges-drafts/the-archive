import React from "react";
import { shape, func, bool, string } from "prop-types";
import { Modal } from "react-bootstrap";
import keycodes from "keycodes";

import { taskShape } from "../task";

const treatCtrlEnter = onSubmit => event => {
  if (event.keyCode === keycodes("enter") && event.ctrlKey) {
    event.preventDefault();
    onSubmit(event);
  }
};

const treatTab = onChange => event => {
  const isTab = event.keyCode === keycodes("tab");
  const isShift = event.shiftKey;
  const content = event.target.value;
  const start = event.target.selectionStart;
  const end = event.target.selectionEnd;
  let changedContent = null;

  if (isTab && isShift) {
    event.preventDefault();

    if (start === end && content.substring(start - 1, start) === "\t") {
      changedContent =
        content.substring(0, start - 1) +
        content.substring(start, content.length);
    }
  } else if (isTab) {
    event.preventDefault();
    changedContent =
      content.substring(0, start) + "\t" + content.substring(end);
  }

  if (changedContent) onChange("content", changedContent);
};

const onKeyDown = (onChange, onSubmit) => event => {
  treatTab(onChange)(event);
  treatCtrlEnter(onSubmit)(event);
};

const TaskEditModal = ({
  task,
  modalTitle,
  onSubmit,
  onChange,
  onCancel,
  isLoading,
  ...rest
}) => {
  let taskForm = task || {};
  return (
    <Modal {...rest} show={!!task} onHide={onCancel}>
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label htmlFor="add-task-title" className="sr-only" />
            <input
              type="text"
              id="add-task-title"
              className="form-control"
              placeholder="Title"
              onChange={event => onChange("title", event.target.value)}
              value={taskForm.title || ""}
            />
          </div>
          <div className="form-group">
            <label htmlFor="add-task-body" className="sr-only" />
            <textarea
              id="add-task-body"
              className="form-control"
              rows="10"
              placeholder="Description"
              onChange={event => onChange("content", event.target.value)}
              value={taskForm.content || ""}
              onKeyDown={onKeyDown(onChange, onSubmit)}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-danger" onClick={onCancel}>
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Confirm"}
          </button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

TaskEditModal.propTypes = {
  task: shape(taskShape),
  modalTitle: string,
  onSubmit: func,
  onChange: func,
  onCancel: func,
  isLoading: bool
};

export default TaskEditModal;
