const { css } = require("glamor");

const baseStyle = {
  container: css({
    display: "flex"
  }),
  layout: css({
    fontFamily: "sans-serif",
    color: "#333"
  }),
  hr: css({
    border: "none",
    borderTop: "1px dashed #ddd",
    paddingBottom: "5px"
  }),
  input: css({
    padding: "5px",
    border: "1px solid #ccc",
    oulineWidth: 0,
    flex: "1 auto"
  }),
  fileInput: css({
    border: "1px solid #ccc",
    outlineWidth: 0,
    flex: "1 auto"
  })
};

const actionButtonStyle = {
  button: css({
    padding: "5px",
    margin: "5px"
  })
};

const actionButtonGroupStyle = {
  container: css({
    display: "flex",
    justifyContent: "flex-end"
  })
};

const searchInputStyle = {
  container: css({
    display: "flex",
    alignItems: "center"
  }),
  input: css(baseStyle.layout, {
    padding: "10px",
    fontSize: "20px",
    border: "none",
    outlineWidth: 0,
    flex: "1 auto"
  })
};

module.exports = {
  baseStyle,
  actionButtonStyle,
  actionButtonGroupStyle,
  searchInputStyle
};
