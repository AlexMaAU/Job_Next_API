const { Router } = require('express');

const healthCheckRouter = Router();

healthCheckRouter.get('/', (req, res) => {
  console.log(req.email)
  res.send('Health, OK');
});

module.exports = healthCheckRouter;
