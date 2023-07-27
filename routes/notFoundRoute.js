const { Router } = require('express');
const notFoundRouter = Router();

notFoundRouter.use('/', (req, res) => {
  return res.status(404).json({ error: 'Endpoint Not Found' });
});

module.exports = notFoundRouter;
