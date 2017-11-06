import HttpStatus from "http-status-codes";
import { restError } from "../commons/rest-error";

const auth = database => async (req, _res, next) => {
  const token = req.headers.token;

  const user = await database
    .collection("users")
    .findOne({ sessions: { $elemMatch: { $eq: token } } });

  // inject user to be used through other sessions
  req.user = user;

  if (!user) {
    throw restError(
      HttpStatus.UNAUTHORIZED,
      HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
      HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED)
    );
  } else next();
};

export default auth;
