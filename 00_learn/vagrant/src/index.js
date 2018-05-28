const express = require("express");
const { query } = require("./db");
const app = express();

app.get("/", async (req, res) => {
  const { results, fields } = await query("SELECT version()");
  res.send(results);
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));
