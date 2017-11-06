import fetch from "node-fetch";
import HttpStatus from "http-status-codes";
import btoa from "btoa";
import {
  username,
  password,
  token,
  createUser,
  useServer,
  serverPath,
  authorizedOnlyRoute
} from "../libs/test-helpers.lib";
import { jsonHeader } from "../../src/commons/rest-headers";

useServer();

describe("auth", () => {
  it("should deny access to nonexistent user", async () => {
    const response = await fetch(serverPath("/users/session"), {
      method: "GET",
      headers: {
        ...jsonHeader,
        Authorization: "Basic " + btoa("invalid-username:invalid-password")
      }
    });

    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
    const json = await response.json();
    expect(json).toEqual({
      code: HttpStatus.UNAUTHORIZED,
      name: "Unauthorized",
      message: "Wrong username or password"
    });
  });

  it("should deny access to user with wrong password", async () => {
    const response = await fetch(serverPath("/users/session"), {
      method: "GET",
      headers: {
        ...jsonHeader,
        Authorization: "Basic " + btoa(`${username}:invalid-password`)
      }
    });

    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  it("should allow valid user to login", async () => {
    const response = await fetch(serverPath("/users/session"), {
      method: "GET",
      headers: {
        ...jsonHeader,
        Authorization: "Basic " + btoa(`${username}:${password}`)
      }
    });

    expect(response.ok).toBeTruthy();
  });

  it("should retrieve session", async () => {
    const response = await fetch(serverPath("/users/session"), {
      method: "GET",
      headers: {
        ...jsonHeader,
        Authorization: "Basic " + btoa(`${username}:${password}`)
      }
    });

    expect(response.ok).toBeTruthy();

    const session = await response.json();
    expect(session.hash).toBeTruthy();
  });

  it("should deny request without token", async () => {
    await createUser("empty-user", "empty-password");
    const response = await fetch(serverPath(authorizedOnlyRoute), {
      method: "GET",
      headers: {
        ...jsonHeader
      }
    });

    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  it("should deny request with invalid token", async () => {
    const response = await fetch(serverPath(authorizedOnlyRoute), {
      method: "GET",
      headers: {
        ...jsonHeader,
        Token: "invalid-token"
      }
    });

    expect(response.ok).toBeFalsy();
    expect(response.status).toBe(HttpStatus.UNAUTHORIZED);
  });

  it("should allow request with valid token", async () => {
    const response = await fetch(serverPath(authorizedOnlyRoute), {
      method: "GET",
      headers: {
        ...jsonHeader,
        Token: token
      }
    });

    expect(response.ok).toBeTruthy();
  });
});
