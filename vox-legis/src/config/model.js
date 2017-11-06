const { homedir } = require("os");
const { shape, string } = require("prop-types");

const configFolder = `${homedir()}/.vox-legis`;
const configFile = `${configFolder}/config.json`;
const defaultSnippetFolder = `${configFolder}/snippets`;
const defaultEncoding = "utf-8";

class ConfigModel {
  constructor(
    snippetFolder = defaultSnippetFolder,
    encoding = defaultEncoding
  ) {
    this.snippetFolder = snippetFolder;
    this.encoding = encoding;
  }
}

module.exports = {
  ConfigModel,
  configFolder,
  configFile
};
