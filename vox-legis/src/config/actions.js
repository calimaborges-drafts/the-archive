const { createWindow } = require("../window");

// actions
const CONFIG_WINDOW = "CONFIG_WINDOW";
const CONFIG_CONTEXT = "CONFIG_CONTEXT";
const createAndShowConfigWindow = () =>
  createWindow(CONFIG_WINDOW, CONFIG_CONTEXT);

const CHANGE_SNIPPET_FOLDER = "CHANGE_SNIPPET_FOLDER";
const openSnippetFolderSelectionDialog = () => dispatch => {
  const { dialog } = require("electron").remote;
  const path = dialog.showOpenDialog({
    properties: ["openDirectory"]
  });

  dispatch(changeSnippetFolder(path));
};

const changeSnippetFolder = path => (dispatch, getState) => {
  const { snippet_folder } = getState().config;
  return {
    type: CHANGE_SNIPPET_FOLDER,
    path
  };
};

module.exports = {
  CONFIG_WINDOW,
  CONFIG_CONTEXT,
  createAndShowConfigWindow,
  openSnippetFolderSelectionDialog
};
