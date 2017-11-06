import HttpStatus from "http-status-codes";
import bcrypt from "bcrypt";
import crypto from "crypto-promise";

import { kSaltRounds, kSessionHashSize } from "../misc/factory";
import { catcher, restError } from "../commons/rest-error";
import { sanitizeUser } from "./users-sanitizer";

const isPasswordValid = async (user, password) =>
  (user ? await bcrypt.compare(password, user.password) : false);


export const usersService = (app, database) => {
  app.post(
    "/users",
    catcher(async (req, res) => {
      let user = sanitizeUser(req.body);
      delete user._id;

      if (user.username.length < 4)
        throw restError("Username should have at least 4 characters");
      user.password = await bcrypt.hash(user.password, kSaltRounds);
      const response = await database.collection("users").insertOne(user);

      user = response.ops[0];
      user.uuid = user._id;
      res.send(JSON.stringify(user));
    })
  );

  app.get(
    "/users/session",
    catcher(async (req, res) => {
      const b64auth = (req.headers.authorization || "").split(" ")[1] || "";
      const [username, password] = new Buffer(b64auth, "base64")
        .toString()
        .split(":");
      const user = await database.collection("users").findOne({ username });

      if (!user || !await isPasswordValid(user, password)) {
        throw restError(
          HttpStatus.UNAUTHORIZED,
          HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
          "Wrong username or password"
        );
      } else {
        let hash = await crypto.randomBytes(kSessionHashSize);
        hash = hash.toString("hex");
        await database
          .collection("users")
          .update({ _id: user._id }, { $push: { sessions: hash } });
        res.status(HttpStatus.CREATED).send({ hash });
      }
    })
  );
};
