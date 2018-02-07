const fetch = require("node-fetch");
const cheerio = require("cheerio");
const fs = require("fs");

const URL =
  "http://www.esaf.fazenda.gov.br/assuntos/concursos_publicos/em-andamento-1/agencia-nacional-de-aviacao-civil-anac";
const DB_FILE = "db.file";

const fetch_content = async () => {
  const response = await fetch(URL);
  return response.text();
};

const check_for_news = async body => {
  const set_quantidade_linhas_tabela = quantidade => {
    fs.writeFileSync(DB_FILE, quantidade);
  };

  const get_quantidade_linhas_tabela = () => {
    if (!fs.existsSync(DB_FILE)) {
      set_quantidade_linhas_tabela(0);
    }
    return parseInt(fs.readFileSync(DB_FILE).toString(), 10);
  };

  const $ = cheerio.load(body);
  const quantidade_linhas_tabela = $("#parent-fieldname-text table.plain tr")
    .length;

  if (quantidade_linhas_tabela === get_quantidade_linhas_tabela()) return false;

  const data = {
    subject: "Atualização ANAC",
    text: `Houve uma atualização na página da ANAC. Acesse: ${URL}. Debug data: ${get_quantidade_linhas_tabela()} - ${quantidade_linhas_tabela}`
  };

  set_quantidade_linhas_tabela(quantidade_linhas_tabela);

  return data;
};

module.exports = {
  fetch_content,
  check_for_news
};
