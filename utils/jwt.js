const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY;

if (!JWT_KEY) {
  console.log('missing JWT_KEY');
  process.exit(1);
}

const generateToken = (payload) => {
  return jwt.sign(payload, JWT_KEY, { expiresIn: '1d' });
};

const validateToken = (token) => {
  // jwt.verify 函数用来验证 JWT 是否有效，并从中提取 payload 的内容
  return jwt.verify(token, JWT_KEY);
};

module.exports = {
  generateToken,
  validateToken,
};
