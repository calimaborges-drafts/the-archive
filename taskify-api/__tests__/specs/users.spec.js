import fetch from "node-fetch";
import bcrypt from "bcrypt";

import { useServer, database, serverPath } from "../libs/test-helpers.lib";
import { jsonHeader } from "../../src/commons/rest-headers";

useServer(false);

describe("users", () => {
  it("should create a user", async () => {
    const user = { username: "usuario", password: "senha" };

    const response = await fetch(serverPath("/users"), {
      method: "POST",
      headers: {
        ...jsonHeader
      },
      body: JSON.stringify(user)
    });
    expect(response.ok).toBeTruthy();

    const docs = await database
      .collection("users")
      .find({ username: "usuario" })
      .toArray();
    expect(docs.length).toBe(1);

    const userUpdated = docs[0];
    const passwordCorrect = await bcrypt.compare("senha", userUpdated.password);
    expect(passwordCorrect).toBeTruthy();
  });

  it("should required user to have at least 4 characters", async () => {
    const user = { username: "use", password: "senha" };

    const response = await fetch(serverPath("/users"), {
      method: "POST",
      headers: {
        ...jsonHeader
      },
      body: JSON.stringify(user)
    });
    expect(response.ok).toBeFalsy();
  });
});
