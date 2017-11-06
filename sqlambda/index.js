export const sql = (...args) => args.join(" ");

export const select = column => `select ${column}`;

export const from = table => `from ${table}`;

export const where = clause => `where ${clause}`;

export const insertInto = table => (...columns) =>
  columns && columns.length > 0
    ? `insert into ${table} (${columns.join(", ")})`
    : `insert into ${table}`;

export const values = (...values) => `values (${values.join(", ")})`;

export const update = table => `update ${table}`;

export const set = setters =>
  `set ${Object.keys(setters)
    .map(key => `${key} = ${setters[key]}`)
    .join(", ")}`;

export const mergeInto = table => setters => postClause =>
  postClause
    ? sql(update(table), set(setters), postClause)
    : sql(
        insertInto(table)(...Object.keys(setters)),
        values(...Object.values(setters))
      );
