const { css } = require("glamor");
const { baseStyle } = require("../commons");

const snippetStyle = {
  container: css(baseStyle.layout, {
    maxWidth: "800px",
    border: "1px solid #ccc",
    padding: "10px",
    fontSize: "0.9em",
    margin: "5px"
  }),
  hr: baseStyle.hr
};

module.exports = { snippetStyle };
