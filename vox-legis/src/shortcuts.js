const { globalShortcut, dialog } = require("electron");
const { toggleDashboardWindow } = require("./dashboard");

const listShortcuts = dispatch => ({
  "Control+Alt+Space": () => dispatch(toggleDashboardWindow())
});

const REGISTER_GLOBAL_SHORTCUTS = "REGISTER_GLOBAL_SHORTCUTS";
const registerShortcuts = () => dispatch => {
  const shortcuts = listShortcuts(dispatch);
  for (key in shortcuts) {
    globalShortcut.register(key, shortcuts[key]);
  }
  return {
    type: REGISTER_GLOBAL_SHORTCUTS
  };
};

module.exports = {
  registerShortcuts
};
