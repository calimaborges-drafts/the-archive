const ERROR = "ERROR";
const error = error => ({
  type: ERROR,
  error
});

const tryCatch = async func => {
  try {
    const ret = await func();
    return ret;
  } catch (err) {
    error(error);
  }
};

module.exports = {
  tryCatch,
  error
};
