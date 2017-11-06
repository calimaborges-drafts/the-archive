import fs from 'fs-promise';
import { clipboard } from 'electron';
import mkdirp from 'mkdirp';
import config from '../misc/config';
import { createSnippet } from './snippet-model';

const encoding = 'utf-8';

const validateSnippet = (title) => {
  if (!title) throw new Error('Título é obrigatório');
};

const sanitizeTitle = (title) => {
  let sanitized = title;
  if (title.endsWith('.md')) {
    sanitized = title.slice(0, -3);
  }
  return sanitized;
};

export const prepareSnippetFolder = () => {
  mkdirp(config.snippet_folder);
};

export const save = async (title, text) => {
  validateSnippet(title);
  const sanitizedTitle = sanitizeTitle(title);
  return fs.writeFile(`${config.snippet_folder}/${sanitizedTitle}.md`, text, encoding);
};

export const get = async (title) => {
  validateSnippet(title);
  return fs.readFile(`${config.snippet_folder}/${title}`, encoding);
};

export const list = async () => {
  const snippets = [];
  const files = await fs.readdir(`${config.snippet_folder}`);

  await Promise.all(files.map(async (file) => {
    snippets.push(createSnippet(file, await get(file)));
  }));

  return snippets;
};

export const copyToClipboard = (text) => clipboard.writeText(text);

export const remove = async (title) => {
  validateSnippet(title);
  return fs.unlink(`${config.snippet_folder}/${title}`);
};

