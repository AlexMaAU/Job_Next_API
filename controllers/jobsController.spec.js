import { createJob } from './jobsController';
import mongoose from 'mongoose';
import { expect, jest } from '@jest/globals';

const mockRequest = {
  body: {},
  user: {
    userId: mongoose.Types.ObjectId.createFromHexString(
      '123412341234123412341234'
    ),
  },
};

const mockResponse = {
  // ex. res.status(201).json(newJob);
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const mockNext = jest.fn();

describe('Job Controller', () => {
  it('fail if either position or company is not included', () => {
    createJob(mockRequest, mockResponse, mockNext);
    expect(mockNext).toHaveBeenCalled();
  });

  it('respond with saved job', () => {
    mockRequest.body = {
      company: 'google',
      position: 'Software Developer',
    };
    mockRequest.user = {
      userId: '123412341234123412341234',
    };
    createJob(mockRequest, mockResponse, mockNext);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith({
      job: { company: 'google', position: 'Software Developer' },
    });
  });
});
