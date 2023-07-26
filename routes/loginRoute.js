const { getTest } = require('../controllers/loginController');

const { Router } = require('express');

const loginRouter = Router();

loginRouter.get('/login', getTest);

module.exports = loginRouter;
