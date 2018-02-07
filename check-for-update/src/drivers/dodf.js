const fetch = require("node-fetch");
const cheerio = require("cheerio");
const { get, put } = require("../storage/file");

const URL = "http://www.buriti.df.gov.br/ftp/";

const fetch_content = async () => {
  const response = await fetch(URL);
  return response.text();
};

const check_for_news = async body => {
  const $ = cheerio.load(body);
  const quantidade_linhas_tabela = $("fieldset a").length;
  const quantidade_linhas_storage = get("quantidade_linhas_seedf");
  if (quantidade_linhas_tabela === quantidade_linhas_storage) return false;

  put("quantidade_linhas_seedf", quantidade_linhas_tabela, 10);

  return {
    subject: "Atualização DODF",
    text: `Houve uma atualização na página do DODF. Acesse: ${URL}. Debug data: ${quantidade_linhas_storage} - ${quantidade_linhas_tabela}`
  };
};

module.exports = {
  fetch_content,
  check_for_news
};
