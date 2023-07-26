const { login, signup } = require('../controllers/authController');

const { Router } = require('express');

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', signup);

module.exports = authRouter;
