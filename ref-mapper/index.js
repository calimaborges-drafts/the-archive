const program = require("commander");
const chalk = require("chalk");
const fs = require("fs-promise");

const appInfo = require("./package.json");
const { refMap, txtMap } = require("./ref-mapper");

let file;
let column;
let encoding;

program
  .version(appInfo.version)
  .arguments("<arquivo> [coluna] [codificacao]")
  .action((arquivo, coluna, codificacao = "UTF-8") => {
    file = arquivo;
    column = coluna;
    encoding = codificacao;
  });
program.parse(process.argv);

if (!file) {
  program.outputHelp();
  console.error(chalk.red("ERRO: arquivo não informado"));
  process.exit(1);
}

const normalizeFilename = filename => {
  const lowered = filename.toLowerCase();
  const extensionLength = 4;
  if (lowered.endsWith(".ref") || lowered.endsWith(".txt")) {
    return filename.substring(0, filename.length - extensionLength);
  }

  return filename;
};

const main = async (filename, column, encoding) => {
  const normalizedFilename = normalizeFilename(filename);
  const refContent = await fs.readFile(normalizedFilename + ".REF", {
    encoding
  });
  let map = refMap(refContent);
  if (column) {
    map = { [column]: map[column] };
  }
  return map;
};

console.log("Press any key to continue");

process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on("data", () => {
  main(file, column, encoding)
    .then(result => {
      console.log(result);
      process.exit(0);
    })
    .catch(error => console.log(chalk.red("ERRO:" + error.message)));
});
