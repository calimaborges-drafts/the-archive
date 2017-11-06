const React = require("react");
const { string } = require("prop-types");
const { FaSearch } = require("react-icons/lib/fa");

const {
  actionButtonStyle,
  searchInputStyle,
  actionButtonGroupStyle
} = require("./styles");

const el = React.createElement;

const ActionButton = props =>
  el("button", Object.assign({}, props, actionButtonStyle.button));
ActionButton.propTypes = {
  label: string
};

const SearchInput = props =>
  el(
    "div",
    Object.assign({}, searchInputStyle.container),
    el(FaSearch, { size: 30 }),
    el("input", Object.assign({ type: "text" }, searchInputStyle.input, props))
  );

const ActionButtonGroup = ({ children }) =>
  el("div", Object.assign({}, actionButtonGroupStyle.container), children);

module.exports = {
  ActionButton,
  SearchInput,
  ActionButtonGroup
};
