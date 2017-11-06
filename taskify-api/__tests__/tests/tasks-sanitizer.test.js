import { sanitizeTask } from "../../src/tasks/tasks-sanitizer";

test("should remove unexisting fields", () => {
  const task = {
    _id: "_id",
    title: "title",
    content: "content",
    userid: "userid",
    deleted_at: new Date(),
    completed: false,
    postpone_date: new Date()
  };

  expect(
    sanitizeTask({
      ...task,
      uuid: "uuid",
      other: "other"
    })
  ).toEqual({
    ...task
  });
});
