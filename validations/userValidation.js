const joi = require('joi');

const userSchema = joi.object({
  username: joi.string().min(2).max(12).required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  password: joi.string().min(2).max(12).required(),
});

module.exports = userSchema;