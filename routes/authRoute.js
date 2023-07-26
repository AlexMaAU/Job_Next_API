const { login, signup } = require('../controllers/authController');

const { Router } = require('express');

const authRouter = Router();

authRouter.post('/users/login', login);
authRouter.post('/users/register', signup);

module.exports = authRouter;
