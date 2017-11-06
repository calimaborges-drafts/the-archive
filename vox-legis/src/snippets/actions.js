const { clipboard, dialog } = require("electron");
const log = require("electron-log");

const {
  setupSnippetPersistence,
  listSnippetsFromDisk
} = require("./persistence");
const { config } = require("../config");
const { tryCatch } = require("../error");

const { createWindow, showWindow, windowExists } = require("../window");

const INIT_SNIPPETS = "INIT_SNIPPETS";
const initSnippets = () => async dispatch => {
  setupSnippetPersistence(config.snippetFolder);
  dispatch(loadSnippets());

  return {
    type: INIT_SNIPPETS
  };
};

const LOAD_SNIPPETS = "LOAD_SNIPPETS";
const loadSnippets = () => async dispatch => {
  const payload = await listSnippetsFromDisk();
  return {
    type: LOAD_SNIPPETS,
    payload
  };
};

const FILTER_SNIPPETS = "FILTER_SNIPPETS";
const filterSnippets = filter => ({
  type: FILTER_SNIPPETS,
  filter
});

const COPY_SNIPPET_CLIPBOARD = "COPY_SNIPPET_CLIPBOARD";
const copySnippetToClipboard = snippet => {
  clipboard.writeText(snippet.body);
  return { type: COPY_SNIPPET_CLIPBOARD };
};

module.exports = {
  loadSnippets,
  LOAD_SNIPPETS,
  filterSnippets,
  FILTER_SNIPPETS,
  copySnippetToClipboard,
  COPY_SNIPPET_CLIPBOARD,
  initSnippets
};
