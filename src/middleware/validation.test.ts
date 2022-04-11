import Validation from './validation';
import {Validator} from 'fluentvalidation-ts';
import {Logger} from 'winston';
import {NextFunction, Request, Response} from 'express';

describe('Validation middleware tests', () => {
  it('should return 400 if validation returns errors', () => {
    const logger = createMockLogger();
    const validator = createValidator();
    // - Mock validate method to return a validation error
    validator.validate = mockValidationError;

    // - Create validation middleware
    const validationMiddleware = createValidationMiddleware(validator, logger);

    const response = createMockResponse();
    const request = createMockRequest();
    const next = createMockNextFunction();

    // - Mock response object to track the status code
    let statusCode;
    response.sendStatus = jest
      .fn()
      .mockImplementation(sentStatusCode => (statusCode = sentStatusCode));

    validationMiddleware.validate(request, response, next);

    expect(statusCode).toBe(400);
  });

  it('should not call next function only once if validation returns errors', () => {
    const logger = createMockLogger();
    const validator = createValidator();
    // - Mock validate method to return a validation error
    validator.validate = mockValidationError;

    // - Create validation middleware
    const validationMiddleware = createValidationMiddleware(validator, logger);

    const response = createMockResponse();
    const request = createMockRequest();
    const next = createMockNextFunction();

    validationMiddleware.validate(request, response, next);

    expect(next).not.toHaveBeenCalled();
  });

  it('should not set status if validation does not return error', () => {
    const logger = createMockLogger();
    const validator = createValidator();
    // - Mock validate method to return a successful validation result
    validator.validate = mockValidationSuccess;

    // - Create validation middleware
    const validationMiddleware = createValidationMiddleware(validator, logger);

    const response = createMockResponse();
    const request = createMockRequest();
    const next = createMockNextFunction();

    // - Mock response object to track the status code
    let statusCode;
    response.sendStatus = jest
      .fn()
      .mockImplementation(sentStatusCode => (statusCode = sentStatusCode));

    validationMiddleware.validate(request, response, next);

    expect(statusCode).toBeUndefined();
  });

  it('should call next function if validation does not return error ', () => {
    const logger = createMockLogger();
    const validator = createValidator();
    // - Mock validate method to return a successful validation result
    validator.validate = mockValidationSuccess;

    // - Create validation middleware
    const validationMiddleware = createValidationMiddleware(validator, logger);

    const response = createMockResponse();
    const request = createMockRequest();
    const next = createMockNextFunction();

    validationMiddleware.validate(request, response, next);

    expect(next).toHaveBeenCalledTimes(1);
  });
});

const createValidator = (): Validator<any> => new Validator<any>();

const createValidationMiddleware = (
  validator: Validator<any>,
  logger: Logger
): Validation<any> => new Validation(validator, logger);

const createMockResponse = (): Response => {
  const response = {} as Response;
  response.sendStatus = jest.fn();
  return response;
};

const createMockRequest = (): Request => ({} as Request);

const createMockLogger = (): Logger => {
  const logger = {} as Logger;
  logger.info = jest.fn();
  logger.debug = jest.fn();
  logger.error = jest.fn();
  return logger;
};

const createMockNextFunction = (): NextFunction => jest.fn();
const mockValidationError = jest
  .fn()
  .mockReturnValue({testError: 'error message'});
const mockValidationSuccess = jest.fn().mockReturnValue({});
