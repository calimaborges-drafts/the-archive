# sqlambda

SQL builder using functions

## Usage

```javascript

sql(select("*"), from("table"), where("1 = 1"))) // select * from table where 1 = 1

sql(
    insertInto("table")("column1", "column2"),
    values("value1", "value2")
) // insert into table (column1, column2) values (value1, value2)

sql(
    update("table"),
    set({ column1: "value1", column2: "value2" }),
    where("1 = 1")
) // update table set column1 = value1, column2 = value2 where 1 = 1

// #merge is a helper that verifies if there is a where clause:
// if there is than it generates update:
mergeInto("table")({
    column1: "value1",
    column2: "value2"
})(where("1 = 1")) // update table set column1 = value1, column2 = value2 where 1 = 1

// else generates an insert:
mergeInto("table")({
    column1: "value1",
    column2: "value2"
})() // insert into table (column1, column2) values (value1, value2)

```