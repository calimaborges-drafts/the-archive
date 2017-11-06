const { createStore, combineReducers, applyMiddleware } = require("redux");
const promise = require("redux-promise");
const thunk = require("redux-thunk").default;

const { context } = require("./context");
const { createTray } = require("./tray");
const {
  loadSnippets,
  snippets,
  filter,
  setupSnippetPersistence
} = require("./snippets");
const { setupConfigPersistence } = require("./config");

class Factory {
  constructor() {
    this.appName = "Vox Legis";
    this.tray = null;
    this.store = null;
  }

  async init() {
    this.initStore();
    this.initTray();
    await this.initConfig();
    await this.initSnippets();
  }

  async initConfig() {
    return setupConfigPersistence();
  }

  async initSnippets() {
    return setupSnippetPersistence();
  }

  initStore() {
    this.store = createStore(
      combineReducers({ context, snippets, filter }),
      applyMiddleware(promise, thunk)
    );
  }

  initTray() {
    this.tray = createTray(this.appName, this.store.dispatch);
  }
}

module.exports = new Factory();
