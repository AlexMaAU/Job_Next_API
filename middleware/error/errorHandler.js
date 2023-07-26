const unknownErrorHandler = (err, req, res) => {
  console.log(err);
  res.status(500).json(err);
};

module.exports = unknownErrorHandler;
