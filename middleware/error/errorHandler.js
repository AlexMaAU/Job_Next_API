const errorHandler = (err, req, res) => {
  console.log(err);
  const defaultError = {
    statusCode: 500,
    msg: 'Something is wrong, try later',
  };

  return res.status(defaultError.statusCode).send(defaultError.msg);
};

module.exports = errorHandler;
