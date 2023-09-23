const errorHandler = (err,req, res, next) => {
  let status = 500;
  let message = "internal server error";

  if (err.name === "InvalidFarmId") {
    status = 404; 
    message = "Farm not found"; 
  }

  res.status(status).json({ message: message });
};

module.exports = errorHandler;
