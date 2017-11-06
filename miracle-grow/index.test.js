const arvore = require("./arvore.json");
const arvoreEsperada = require("./arvore-esperada.json");
const arvoreComplexa = require("./arvore-complexa.json");
const arvoreComplexaEsperada = require("./arvore-complexa-esperada.json");
const arvoreChave = require("./arvore-chave.json");
const arvoreChaveEsperada = require("./arvore-chave-esperada.json");
const { searchTree, miracleGrow } = require("./");

describe("tree search", () => {
  test("deve localizar node primeiro nivel", () => {
    expect(searchTree(arvoreComplexaEsperada, 2)).toEqual({
      id: 2,
      parent: null,
      children: []
    });
  });

  test("deve localizar qualquer node", () => {
    expect(searchTree(arvoreComplexaEsperada, 7)).toEqual({
      id: 7,
      parent: 3,
      children: []
    });
  });

  test("deve retornar null caso não encontre o node", () => {
    expect(searchTree(arvoreComplexaEsperada, -1)).toEqual(null);
  });
});

describe("miracle grow", () => {
  test("deve converter árvore no formato certo", () => {
    expect(miracleGrow(arvore)).toEqual(arvoreEsperada);
  });

  test("deve converter árvore complexa no formato certo", () => {
    expect(miracleGrow(arvoreComplexa)).toEqual(arvoreComplexaEsperada);
  });

  test("deve converter árvore com parentKey e key diferentes", () => {
    expect(miracleGrow(arvoreChave, "chave", "chavePai")).toEqual(
      arvoreChaveEsperada
    );
  });
});
