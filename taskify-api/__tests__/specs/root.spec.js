import fetch from "node-fetch";
import HttpStatus from "http-status-codes";
import { jsonHeader } from "../../src/commons/rest-headers";

import {
  useServer,
  serverPath
} from "../libs/test-helpers.lib";

useServer();

describe("root", () => {
  it("should get basic info about the app", async () => {
    const response = await fetch(serverPath("/"), {
      method: "GET",
      headers: {
        ...jsonHeader
      }
    });

    expect(response.ok).toBeTruthy();
    expect(response.status).toBe(HttpStatus.OK);
    const json = await response.json();
    expect(json).toEqual(expect.objectContaining({
      name: expect.any(String),
      version: expect.any(String),
      env: expect.any(String)
    }));
  });
});
