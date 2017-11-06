const React = require("react");
const ReactDOM = require("react-dom");
const { Provider } = require("react-redux");
const { remote } = require("electron");

const factory = remote.require(`${__dirname}/../factory`);
const { DASHBOARD_WINDOW, DashboardContainer } = require("../dashboard");
const { CONFIG_WINDOW, ConfigContainer } = require("../config");

const el = React.createElement;

const contextComponent = id => {
  switch (id) {
    case DASHBOARD_WINDOW:
      return el(DashboardContainer);
    case CONFIG_WINDOW:
      return el(ConfigContainer);
    default:
      return el("div", undefined, `Identificador não reconhecido: ${id}`);
  }
};

const render = id => {
  ReactDOM.render(
    el(
      Provider,
      { store: factory.store },
      el("div", undefined, contextComponent(id))
    ),
    document.getElementById("root")
  );
};

module.exports = render;
