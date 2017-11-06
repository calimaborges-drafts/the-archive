import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";
import normalizeUrl from "normalize-url";
import winston from "winston";

import Server from "../../src/server";
import { kSaltRounds } from "../../src/misc/factory";

export let database = null;
export let server = null;

export let userid = null;
export const username = "username";
export const password = "password";

export const token = "secret-test-hash";
export const authorizedOnlyRoute = "/tasks";
export const authHeaders = {
  Token: token
};

export const port = 1338;
export const serverPath = path => {
  return normalizeUrl(`http://localhost:${port}/${path}`);
};

export const createUser = async (username, password, token) => {
  let user = {
    username,
    password: await bcrypt.hash(password, kSaltRounds)
  };

  if (token) {
    user.sessions = [token];
  }

  return database.collection("users").insertOne(user);
};

export const useServer = (shouldCreateUser = true) => {
  beforeAll(async () => {
    try {
      if (!database) {
        database = await MongoClient.connect("mongodb://localhost:27017/test");
      }

      if (!server) {
        server = new Server(port, database);
      }

      await server.start();
    } catch (error) {
      winston.error(error);
    }
  });

  afterAll(async () => {
    if (database) await database.close();
    if (server) await server.close();
  });

  beforeEach(async () => {
    try {
      await database.dropDatabase();
      if (shouldCreateUser) {
        const created = await createUser(username, password, token);
        userid = created.ops[0]._id;
      }
    } catch (error) {
      winston.error(error);
    }
  });
};
