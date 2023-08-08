const { Router } = require('express');
const {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
} = require('../controllers/jobsController');
const jobsRouter = Router();

jobsRouter.get('/all', getAllJobs);

jobsRouter.post('/', createJob);

jobsRouter.put('/:id', updateJob);

jobsRouter.delete('/:id', deleteJob);

module.exports = jobsRouter;
