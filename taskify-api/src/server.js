import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { name, version } from "../package.json";
import { tasksService } from "./tasks/tasks-service";
import { usersService } from "./users/users-service";
import { errorHandler } from "./commons/rest-error";

class Server {
  port = null;
  database = null;
  app = null;
  server = null;

  constructor(port = 1337, database) {
    this.port = port;
    this.database = database;
  }

  async start() {
    this.app = express();

    this.app.use(bodyParser.json());
    this.app.use(cors());

    tasksService(this.app, this.database);
    usersService(this.app, this.database);

    this.app.get("/", (_req, res) => {
      let data = { name, version, env: process.env.NODE_ENV };
      const herokuRelease = process.env.HEROKU_RELEASE_VERSION;
      if (herokuRelease) {
        data.heroku = herokuRelease;
      }

      res.send(JSON.stringify(data));
    });

    // should be last so it can capture errors
    errorHandler(this.app);

    return new Promise(resolve => {
      this.server = this.app.listen(this.port, () => {
        resolve();
      });
    });
  }

  async close() {
    await this.server.close();
  }
}

export default Server;
