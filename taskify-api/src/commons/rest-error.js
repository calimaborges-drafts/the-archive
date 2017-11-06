import HttpStatus from "http-status-codes";
import winston from "winston";

export const restError = (code, name, message) => {
  let error = new Error();
  error.isRestError = true;
  error.code = code;
  error.name = name;
  error.message = message;
  return error;
};

export const catcher = fn => (req, res, next) => {
  return fn(req, res, next).catch(error => {
    next(error);
  });
};

export const errorHandler = app => {
  app.use((err, _req, res, _next) => {
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    if (err.isRestError) status = err.code;
    else winston.error(err);

    res.status(status).send(
      JSON.stringify({
        code: err.code,
        name: err.name,
        message: err.message
      })
    );
  });
};
