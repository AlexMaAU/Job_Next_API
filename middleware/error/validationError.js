const validationError = (error, req, res, next) => {
  // check if error type is ValidationError - based on error.details
  if (error.details && error.details.length > 0) {
    return res.status(400).json({ error: error.details[0].message });
  }
  // if not, pass error down to errorHandler middleware
  next(error);
};

module.exports = validationError;
