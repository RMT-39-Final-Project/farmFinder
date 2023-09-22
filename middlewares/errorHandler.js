const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = "internal server error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "investor_not_found") {
    status = 404;
    message = `investor with id ${err.id} not found`;
  } else if (err.name === "email/password_required") {
    status = 400;
    message = "Email/Password required";
  } else if (err.name === "invalid_email/password") {
    status = 400;
    message = "Email/Password invalid";
  }
  res.status(status).json({ message: message });
};

module.exports = errorHandler;
