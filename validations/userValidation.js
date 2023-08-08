const joi = require('joi');

const userValidation = joi.object({
  username: joi.string().min(2).max(12).required(),
  email: joi.string().email({ tlds: { allow: false } }),
  password: joi.string().min(2).max(12).required(),
});

module.exports = userValidation;
