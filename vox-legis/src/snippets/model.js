const { shape, string } = require("prop-types");

class SnippetModel {
  constructor(title = "", body = "") {
    this.title = title;
    this.body = text;
  }
}

const snippetPropType = {
  title: string,
  body: string
};

const snippetShape = shape(snippetPropType);

module.exports = {
  snippetPropType,
  snippetShape,
  SnippetModel
};
