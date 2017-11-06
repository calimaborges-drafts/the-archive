const { removeAccents } = require("../commons");

const getFilteredSnippets = state => {
  const { snippets, filter } = state;
  return snippets.filter(snippet => {
    const title = removeAccents(snippet.title);
    const body = removeAccents(snippet.body);
    const query = removeAccents(filter);

    return (
      !filter ||
      (title && title.search(query) !== -1) ||
      (body && body.search(query) !== -1)
    );
  });
};

module.exports = {
  getFilteredSnippets
};
