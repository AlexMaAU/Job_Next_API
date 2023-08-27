import mongoose from 'mongoose';
import jobModel from './jobModel.js';

describe('Job Model', () => {
  it('it should throw an error due to missing company fields', () => {
    const job = new jobModel({
      position: 'Software Developer',
      // company: 'google',
      createdBy: mongoose.Types.ObjectId.createFromHexString(
        '123412341234123412341234'
      ),
    });
    expect(job.save()).rejects.toThrow();
  });

  it('it should save a job with all required fields', () => {
    const job = new jobModel({
      company: 'google',
      position: 'Software Developer',
      createdBy: mongoose.Types.ObjectId.createFromHexString(
        '123412341234123412341234'
      ),
    });
    expect(job.save()).resolves.toBeTruthy();
  });
});
