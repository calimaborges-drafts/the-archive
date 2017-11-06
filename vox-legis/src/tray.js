const path = require("path");
const { Tray, Menu } = require("electron");

const { showWindow, createWindow } = require("./window");
const { showDashboardWindow } = require("./dashboard");
const { SNIPPET_EDIT_WINDOW } = require("./snippets");
const { createAndShowConfigWindow } = require("./config");

const createTray = (tooltip, dispatch) => {
  const tray = new Tray(
    path.join(__dirname, "..", "assets", "img", "tray-icon.png")
  );
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Gerenciar Autotextos",
      click: () => dispatch(createWindow(SNIPPET_EDIT_WINDOW))
    },
    {
      label: "Pesquisar Autotexto",
      click: () => dispatch(showDashboardWindow())
    },
    { type: "separator" },
    {
      label: "Ajustes",
      click: () => dispatch(createAndShowConfigWindow())
    },
    { label: "Sair", role: "quit" }
  ]);
  tray.setToolTip(tooltip);
  tray.setContextMenu(contextMenu);

  return tray;
};

module.exports = {
  createTray
};
