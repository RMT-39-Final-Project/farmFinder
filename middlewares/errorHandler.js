const errorHandler = (req, res, next) => {
  let status = 500;
  let message = "internal server error";

  res.status(status).json({ message: message });
};

module.exports = errorHandler;
