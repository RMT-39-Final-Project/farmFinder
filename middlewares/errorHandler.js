const errorHandler = (req, res, error, next) => {
  let status = 500;
  let message = "internal server error";

  console.log(error);

  if (error.name === "Bad request") {
    status = 400;
    message = "Description cannot be empty!";
  }

  res.status(status).json({ message: message });
};

module.exports = errorHandler;
