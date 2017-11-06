import { sanitizeUser } from "../../src/users/users-sanitizer";

test("should remove unexisting fields", () => {
  const user = {
    _id: "_id",
    username: "title",
    password: "content"
  };

  expect(
    sanitizeUser({
      ...user,
      uuid: "uuid",
      other: "other"
    })
  ).toEqual({
    ...user
  });
});
