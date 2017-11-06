const fs = require("fs-promise");
const mkdirp = require("mkdirp");

const { SnippetModel } = require("./model");
const { getConfig } = require("../config");

const setupSnippetPersistence = async () => {
  const config = await getConfig();
  mkdirp(config.snippetFolder);
};

const validateSnippet = ({ title }) => {
  if (!snippet.title) throw new Error("Título é obrigatório");
};

const sanitizeSnippet = ({ title, body }) => {
  return {
    title: title.endsWith(".md") ? title.slice(0, -3) : title,
    body
  };
};

const saveSnippetToDisk = async (title, body) => {
  const config = await getConfig();
  validateSnippet({ title, body });
  return fs.writeFile(
    `${config.snippetFolder}/${sanitizeSnippet({ title, body }).title}.md`,
    text,
    encoding
  );
};

const getSnippetFromDisk = async title => {
  const config = await getConfig();
  const body = await fs.readFile(
    `${config.snippetFolder}/${sanitizeSnippet({ title }).title}.md`,
    encoding
  );
  return sanitizeSnippet({ title, body });
};

const listSnippetsFromDisk = async () => {
  const config = await getConfig();
  const files = await fs.readdir(config.snippetFolder);

  return files.reduce(async (prev, file) => {
    const content = await getSnippetFromDisk(file);
    const all = await prev;
    return [...all, content];
  }, []);
};

module.exports = {
  setupSnippetPersistence,
  validateSnippet,
  sanitizeSnippet,
  saveSnippetToDisk,
  getSnippetFromDisk,
  listSnippetsFromDisk
};
