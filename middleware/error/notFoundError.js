const notFoundError = (error, req, res, next) => {
  res.status(404).json({error: error.message});
  next(error);
};

module.exports = notFoundError;
