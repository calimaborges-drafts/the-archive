const { refMap } = require("./ref-mapper");

test("deve somar quantidade de caracteres de 2 linhas", () => {
  const content =
    "IT-CO-USUARIO                           A 011\r\n" +
    "IT-CO-TERMINAL-USUARIO                  A 008\r\n";

  expect(refMap(content)).toEqual({
    "IT-CO-USUARIO": [0, 11, 11],
    "IT-CO-TERMINAL-USUARIO": [11, 19, 8]
  });
});

test("deve considerar separações decimais", () => {
  const content =
    "IT-CO-USUARIO                           A 011\r\n" +
    "IT-VA-PRINCIPAL                         N 15,2\r\n" +
    "IT-CO-TERMINAL-USUARIO                  A 008\r\n";

  expect(refMap(content)).toEqual({
    "IT-CO-USUARIO": [0, 11, 11],
    "IT-VA-PRINCIPAL": [11, 28, 17],
    "IT-CO-TERMINAL-USUARIO": [28, 36, 8]
  });
});
