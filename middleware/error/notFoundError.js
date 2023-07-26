const notFoundError = (req, res) => {
  res.status(404).json('Not Found');
};

module.exports = notFoundError