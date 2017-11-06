const { BrowserWindow } = require("electron");

let windows = {};

const CREATE_WINDOW = "CREATE_WINDOW";
const createWindow = (id, contextType, properties) => {
  let window = windows[id];
  if (!window) {
    window = new BrowserWindow(properties);
    window.loadURL(`file://${__dirname}/main/main.html?id=${id}`);
    windows[id] = window;
    window.once("close", () => {
      delete windows[id];
    });
  }

  return {
    type: CREATE_WINDOW,
    id,
    contextType
  };
};

const HIDE_WINDOW = "HIDE_WINDOW";
const hideWindow = id => {
  const window = windows[id];
  if (window) window.hide();
  // TODO: lembrar desregistrar shortcuts
  return {
    type: HIDE_WINDOW,
    id
  };
};

const SHOW_WINDOW = "SHOW_WINDOW";
const showWindow = id => {
  const window = windows[id];
  if (window) window.show();
  // TODO: lembrar registrar shortcuts
  return {
    type: SHOW_WINDOW,
    id
  };
};

const TOGGLE_WINDOW_VISIBILITY = "TOGGLE_WINDOW_VISIBILITY";
const toggleWindowVisibility = id => {
  const window = windows[id];
  if (!window) return;
  if (window.isVisible()) {
    return hideWindow(id);
  } else {
    return showWindow(id);
  }
};

module.exports = {
  createWindow,
  showWindow,
  hideWindow,
  toggleWindowVisibility
};
