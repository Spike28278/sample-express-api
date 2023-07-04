// validation.test.ts
import {Logger} from 'winston';
import {NextFunction, Request, Response} from 'express';
import {ObjectSchema} from 'joi';
import {Validation} from './validation'; // Update with your actual import

describe('Validation', () => {
  let mockSchema: ObjectSchema;
  let mockLogger: Logger;
  let validation: Validation<any>;

  beforeEach(() => {
    // Mock Joi schema
    mockSchema = {
      validate: jest.fn(),
    } as any;

    // Mock logger
    mockLogger = {
      error: jest.fn(),
    } as any;

    // Create instance of validation class
    validation = new Validation<any>(mockSchema, mockLogger);
  });

  it('should call next function when there are no validation errors', () => {
    const mockReq = {} as Request;
    const mockRes = {} as Response;
    const mockNext = jest.fn() as NextFunction;
    const mockResult = {error: null};

    (mockSchema.validate as jest.Mock).mockReturnValue(mockResult);

    validation.validate(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalledTimes(1);
    expect(mockLogger.error).not.toHaveBeenCalled();
  });

  it('should log error and send response with status 400 when there are validation errors', () => {
    const mockReq = {} as Request;
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any;
    const mockNext = jest.fn() as NextFunction;
    const mockError = new Error('Validation error');
    const mockResult = {error: mockError};

    (mockSchema.validate as jest.Mock).mockReturnValue(mockResult);

    validation.validate(mockReq, mockRes, mockNext);

    expect(mockLogger.error).toHaveBeenCalledWith(
      'validation error',
      mockError
    );
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith({error: mockError.message});
    expect(mockNext).not.toHaveBeenCalled();
  });
});
