const joi = require('joi');

const jobValidation = joi.object({
  company: joi.string().min(1).max(50).required(),
  position: joi.string().min(1).max(100).required(),
  jobType: joi.string().required(),
  jobLocation: joi.string().required(),
  createdBy: joi.required(),
});

module.exports = jobValidation;
