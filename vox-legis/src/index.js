const { app } = require("electron");

const factory = require("./factory");
const { registerShortcuts } = require("./shortcuts");
const { createDashboardWindow } = require("./dashboard");
const { loadSnippets } = require("./snippets");

process.on("unhandledRejection", (reason, p) => {
  console.log("Unhandled Rejection at: Promise", p, "reason:", reason);
  // application specific logging, throwing an error, or other logic here
});

app.on("ready", async () => {
  await factory.init();
  const dispatch = factory.store.dispatch;

  dispatch(registerShortcuts());
  dispatch(createDashboardWindow());
  dispatch(loadSnippets());
});
