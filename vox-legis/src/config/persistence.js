const fs = require("fs-promise");
const mkdirp = require("mkdirp");

const configEncoding = "utf-8";
const { ConfigModel, configFile, configFolder } = require("./model");

const config = {};

const setupConfigPersistence = async () => {
  const configFileExists = await fs.exists(configFile);
  if (!configFileExists) {
    await mkdirp(configFolder);
    await saveConfigToDisk(new ConfigModel());
  }

  Object.assign(config, await getConfigFromDisk());
};

const validateConfig = async ({ snippetFolder }) => {
  const snippetFolderExists = await fs.exists(snippetFolder);
  if (!snippetFolderExists) throw new Error("Pasta de autotextos não existe");
};

const saveConfigToDisk = async ({ snippetFolder, encoding }) => {
  validateConfig({ snippetFolder });
  config = new ConfigModel(snippetFolder, encoding);
  const configFileTabSize = 2;
  return fs.writeFile(
    configFile,
    JSON.stringify(config, null, configFileTabSize),
    configEncoding
  );
};

const getConfigFromDisk = async () => {
  const configStr = await fs.readFile(configFile, configEncoding);
  return JSON.parse(configStr);
};

const getConfig = async () => {
  if (!config) {
    config = await getConfigFromDisk();
  }

  return config;
};

module.exports = {
  setupConfigPersistence,
  validateConfig,
  saveConfigToDisk,
  getConfigFromDisk,
  getConfig
};
