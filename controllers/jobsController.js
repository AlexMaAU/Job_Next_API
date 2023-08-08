const jobValidation = require('../validations/jobValidation');
const jobModel = require('../models/jobModel');

const createJob = async (req, res, next) => {
  const { position, company, jobType, jobLocation } = req.body;
  const createdBy = req.user.userId;
  if (!position || !company || !jobType || !jobLocation || !createdBy) {
    return res.status(401).json({ error: 'Missing required field' });
  }
  try {
    const validBody = await jobValidation.validateAsync({
      position,
      company,
      jobType,
      jobLocation,
      createdBy,
    });
    const newJob = new jobModel(validBody);
    await newJob.save();
    res.status(201).json(newJob);
  } catch (error) {
    next(err);
  }
  res.send('create job');
};

const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await jobModel.find({ createdBy: req.user.userId }).exec();
    res.status(200).json({ jobs, totalJob: jobs.length });
  } catch (error) {
    next(error);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const { position, company, jobType, jobLocation } = req.body;
    const updateInfo = {
      position,
      company,
      jobType,
      jobLocation,
      createdBy: req.user.userId,
    };
    const validBody = await jobValidation.validateAsync(updateInfo);
    const updatedJob = await jobModel
      .findByIdAndUpdate(jobId, validBody, { new: true })
      .exec();
    res.status(201).json(updatedJob);
  } catch (error) {
    next(error);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const job = await jobModel.findByIdAndDelete(jobId).exec();
    res.status(200).json(job);
  } catch (error) {
    next(error);
  }
};

module.exports = { createJob, getAllJobs, updateJob, deleteJob };
