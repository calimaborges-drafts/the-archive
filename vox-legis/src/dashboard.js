const React = require("react");
const { connect } = require("react-redux");

const { SearchInput } = require("./commons");
const {
  SnippetList,
  filterSnippets,
  getFilteredSnippets,
  copySnippetToClipboard
} = require("./snippets");
const {
  createWindow,
  showWindow,
  toggleWindowVisibility
} = require("./window");

// actions
const DASHBOARD_WINDOW = "DASHBOARD_WINDOW";
const DASHBOARD_CONTEXT = "DASHBOARD_CONTEXT";
const createDashboardWindow = () =>
  createWindow(DASHBOARD_WINDOW, DASHBOARD_CONTEXT, {
    width: 800,
    height: 400,
    frame: false,
    show: false,
    alwaysOnTop: true
  });
const showDashboardWindow = () => showWindow(DASHBOARD_WINDOW);
const toggleDashboardWindow = () => toggleWindowVisibility(DASHBOARD_WINDOW);

// views
const el = React.createElement;
const Dashboard = ({ snippets, filter, onChangeFilter, onCopySnippet }) =>
  el(
    "div",
    undefined,
    el(SearchInput, {
      placeholder: "Buscar auto textos",
      value: filter || "",
      onChange: onChangeFilter,
      autoFocus: true
    }),
    el(SnippetList, { snippets, onCopySnippet })
  );
const mapStateToProps = state => ({
  snippets: getFilteredSnippets(state),
  filter: state.filter
});
const mapDispatchToProps = (dispatch, { filter }) => ({
  onChangeFilter: event => dispatch(filterSnippets(event.target.value)),
  onCopySnippet: copySnippetToClipboard
});
const DashboardContainer = connect(mapStateToProps, mapDispatchToProps)(
  Dashboard
);

module.exports = {
  DASHBOARD_WINDOW,
  DashboardContainer,
  createDashboardWindow,
  showDashboardWindow,
  toggleDashboardWindow
};
