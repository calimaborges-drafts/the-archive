const React = require("react");

const { func, arrayOf } = require("prop-types");

const { snippetPropType, snippetShape } = require("./model");
const { ActionButton, ActionButtonGroup } = require("../commons");
const { snippetStyle } = require("./styles");

const el = React.createElement;

const Snippet = ({ title, body, onCopySnippet }) =>
  el(
    "div",
    Object.assign({}, snippetStyle.container),
    el("b", undefined, title),
    el("hr", Object.assign({}, snippetStyle.hr)),
    el("pre", undefined, body),
    el("hr", Object.assign({}, snippetStyle.hr)),
    el(
      ActionButtonGroup,
      undefined,
      el(
        ActionButton,
        { onClick: () => onCopySnippet({ title, body }) },
        "Copiar"
      )
    )
  );
Snippet.propTypes = Object.assign(snippetPropType, {
  onCopySnippet: func
});

const SnippetList = ({ snippets, onCopySnippet }) =>
  el(
    "div",
    undefined,
    snippets && !snippets.length == 0
      ? snippets.map(snippet =>
          el(
            Snippet,
            Object.assign({ key: snippet.title, onCopySnippet }, snippet)
          )
        )
      : el("h2", undefined, "Nenhum auto texto encontrado.")
  );
SnippetList.propTypes = {
  snippets: arrayOf(snippetShape),
  onCopySnippet: func
};

module.exports = {
  Snippet,
  SnippetList
};
