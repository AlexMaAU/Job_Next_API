const { Schema, model, Types } = require('mongoose');

const jobsSchema = new Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company'],
    },
    position: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'Sydney',
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const jobModel = model('Job', jobsSchema);

module.exports = jobModel;
