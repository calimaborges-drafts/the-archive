const mysql = require("mysql");

function query(queryString) {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "musicjungle",
    password: "minha-senha"
  });
  connection.connect();
  return new Promise((resolve, fail) =>
    connection.query(queryString, (error, results, fields) => {
      if (error) fail(error);
      return resolve({ results, fields });
    })
  );
  connection.end();
}

module.exports = { query };
