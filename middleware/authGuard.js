const { validateToken } = require('../utils/jwt');

const tokenValidation = (req, res, next) => {
  // const authorization = req.headers.authorization;
  const authorization = req.header('Authorization');
  // Bearer <token>
  if (!authorization) {
    return res.status(401).json({ error: 'missing authorization header' });
  }

  const [prefix, token] = authorization.split(' ');
  if (prefix !== 'Bearer' || !token) {
    return res.status(401).jon({ error: 'invalid authorization token format' });
  }

  try {
    const payload = validateToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: 'invalid token' });
    return;
  }
};

module.exports = tokenValidation;
