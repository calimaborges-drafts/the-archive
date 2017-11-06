const React = require("react");
const { Component } = require("react");
const ReactDOM = require("react-dom");
const { css } = require("glamor");
const { connect } = require("react-redux");

const { baseStyle } = require("../commons");
const { getConfig } = require("./persistence");
const { openSnippetFolderSelectionDialog } = require("./actions");

// views
const el = React.createElement;
const Config = ({ onSnippetFolderButtonClick }) =>
  el(
    "div",
    Object.assign({}, baseStyle.container),
    el(
      "label",
      Object.assign({ htmlFor: "snippets-folder" }, baseStyle.label),
      "Pasta de autotextos"
    ),
    el(
      "input",
      Object.assign(
        {
          type: "input",
          id: "snippets-folder",
          readOnly: true,
          value: getConfig().snippetFolder
        },
        baseStyle.input
      )
    ),
    el(
      "button",
      {
        onClick: onSnippetFolderButtonClick
      },
      "Selectionar pasta"
    )
  );

const mapDispatchToProps = dispatch => ({
  onSnippetFolderButtonClick: () => dispatch(openSnippetFolderSelectionDialog())
});
const ConfigContainer = connect(undefined, mapDispatchToProps)(Config);

module.exports = {
  ConfigContainer
};
