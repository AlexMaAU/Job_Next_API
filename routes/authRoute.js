const { login, signup, updateUser } = require('../controllers/authController');
const tokenValidation = require('../middleware/authGuard');

const { Router } = require('express');

const authRouter = Router();

authRouter.post('/login', login);
authRouter.post('/register', signup);
authRouter.put('/update-user', tokenValidation, updateUser);

module.exports = authRouter;
