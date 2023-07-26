const { Router } = require('express');

const healthCheckRouter = Router();

healthCheckRouter.get('/', (req, res) => {
  res.send('Health, OK');
});

module.exports = healthCheckRouter;
