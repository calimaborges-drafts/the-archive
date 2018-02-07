const fs = require("fs");
const DB_FILE = "storage.db";

const read_db = () => {
  if (!fs.existsSync(DB_FILE)) {
    write_db({});
  }
  return JSON.parse(fs.readFileSync(DB_FILE).toString());
};

const write_db = content => fs.writeFileSync(DB_FILE, JSON.stringify(content));

const get = key => {
  const content = read_db();
  return content[key];
};

const put = (key, value) => {
  const previous_content = read_db();
  const content = {
    ...previous_content,
    [key]: value
  };
  write_db(content);
};

module.exports = { get, put };
