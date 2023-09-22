const errorHandler = (err, req, res, next) => {
  let status = 500;
  let message = 'internal server error';
  switch (err.name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      status = 400;
      message = err.errors[0].message;
      return res.status(status).json({ message });
    case 'not_found':
      status = 404;
      message = 'not found';
      return res.status(status).json({ message });
    default:
      res.status(status).json({ message: message });
  }
};

module.exports = errorHandler;
