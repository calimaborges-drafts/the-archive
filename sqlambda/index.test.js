import {
  sql,
  select,
  from,
  where,
  insertInto,
  values,
  update,
  set,
  mergeInto
} from "./";

describe("sqlambda", () => {
  it("should abstract SQL queries", () => {
    expect(sql(select("*"), from("table"), where("1 = 1"))).toBe(
      "select * from table where 1 = 1"
    );
  });

  it("should abstract SQL inserts", () => {
    expect(
      sql(insertInto("table")("column1", "column2"), values("value1", "value2"))
    ).toBe("insert into table (column1, column2) values (value1, value2)");
  });

  it("should abstract SQL updates", () => {
    expect(
      sql(
        update("table"),
        set({ column1: "value1", column2: "value2" }),
        where("1 = 1")
      )
    ).toBe("update table set column1 = value1, column2 = value2 where 1 = 1");
  });

  it("should abstract merge operations", () => {
    expect(
      mergeInto("table")({
        column1: "value1",
        column2: "value2"
      })(where("1 = 1"))
    ).toBe("update table set column1 = value1, column2 = value2 where 1 = 1");

    expect(
      mergeInto("table")({
        column1: "value1",
        column2: "value2"
      })()
    ).toBe("insert into table (column1, column2) values (value1, value2)");
  });
});

describe("sql builder", () => {
  it("should aggregate clauses", () => {
    expect(sql("select *", "from table")).toBe("select * from table");
  });
});

describe("select builder", () => {
  it("should generate simple select statements", () => {
    expect(select("*")).toBe("select *");
  });
});

describe("from builder", () => {
  it("should generate simple from statements", () => {
    expect(from("table")).toBe("from table");
  });
});

describe("where builder", () => {
  it("should generate simple where statements", () => {
    expect(where("1 = 1")).toBe("where 1 = 1");
  });
});

describe("insert builder", () => {
  it("should generate simple insert statements", () => {
    expect(insertInto("table")()).toBe("insert into table");
  });

  it("should allow to specify column names", () => {
    expect(insertInto("table")("column1", "column2")).toBe(
      "insert into table (column1, column2)"
    );
  });
});

describe("values builder", () => {
  it("should generate simple values statements", () => {
    expect(values("value1", "value2")).toBe("values (value1, value2)");
  });
});

describe("update builder", () => {
  it("should generate simple update statements", () => {
    expect(update("table")).toBe("update table");
  });
});
