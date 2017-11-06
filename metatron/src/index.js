import { app, globalShortcut, Menu, Tray, BrowserWindow, dialog } from 'electron';
import { enableLiveReload } from 'electron-compile';

import { prepareSnippetFolder } from './snippets/snippets-persistence';
import { store } from './misc/main-factory';
import { nextItem, previousItem } from './main/main-actions';

let mainWindow;
let tray;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

const selectPreviousItem = () => store.dispatch(previousItem());
const selectNextItem = () => store.dispatch(nextItem());

const unregisterWindowShortcuts = () => {
  if (globalShortcut.isRegistered('Esc')) globalShortcut.unregister('Esc');
  if (globalShortcut.isRegistered('Up')) globalShortcut.unregister('Up');
  if (globalShortcut.isRegistered('Down')) globalShortcut.unregister('Down');
};

const hideMainWindow = () => {
  if (mainWindow) mainWindow.hide();
  unregisterWindowShortcuts();
};

const registerWindowShortcuts = () => {
  globalShortcut.register('Esc', hideMainWindow);
  globalShortcut.register('Up', selectPreviousItem);
  globalShortcut.register('Down', selectNextItem);
};

const showMainWindow = () => {
  mainWindow.show();
  registerWindowShortcuts();
};

const closeMainWindow = () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.close();
  }
  mainWindow = null;
};

const createMainWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 400,
    frame: false,
  });
  mainWindow.loadURL(`file://${__dirname}/commons/base.html`);
  mainWindow.hide();

  mainWindow.on('blur', hideMainWindow);
  mainWindow.on('closed', hideMainWindow);
};

const toggleMainWindow = () => {
  if (!mainWindow) return;
  if (mainWindow.isVisible()) {
    hideMainWindow();
  } else {
    showMainWindow();
  }
};

const createTray = () => {
  tray = new Tray(`${__dirname}/../assets/img/tray-icon.png`);
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Pesquisar Autotexto', click: showMainWindow },
    { type: 'separator' },
    { label: 'Sair', role: 'quit' },
  ]);
  tray.setToolTip('Metatron');
  tray.setContextMenu(contextMenu);
};

const registerShortcuts = () => {
  if (!globalShortcut.register('Control+Alt+Space', toggleMainWindow)) { dialog.showErrorBox('ERRO!', 'Falha ao registrar atalho!'); }
};

app.on('window-all-closed', () => { });

app.on('ready', () => {
  registerShortcuts();
  createTray();
  createMainWindow();
  prepareSnippetFolder();
});

app.on('will-quit', () => {
  closeMainWindow();
  globalShortcut.unregisterAll();
});
