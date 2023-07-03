import {NextFunction, Request, Response} from 'express';
import {Logger} from 'winston';
import {Validation} from './validation';
import {ObjectSchema, ValidationError, ValidationResult} from 'joi';

describe('Validation', () => {
  let validation: Validation<any>;
  let req: Request;
  let res: Response;
  let next: NextFunction;
  let logger: Logger;

  beforeEach(() => {
    logger = {error: jest.fn()} as unknown as Logger;
    const schema: ObjectSchema<any> = {
      validate: jest.fn(),
    } as unknown as ObjectSchema<any>;

    validation = new Validation<any>(schema, logger);

    req = {} as Request;
    res = {sendStatus: jest.fn()} as unknown as Response;
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('validate', () => {
    test('should call the schema validate method with the request body', () => {
      const schema = validation['schema'] as ObjectSchema<any>;
      const validateSpy = jest.spyOn(schema, 'validate');

      req.body = {name: 'John Doe', age: 25};

      validation.validate(req, res, next);

      expect(validateSpy).toHaveBeenCalledWith(req.body);
    });

    test('should call the next function if validation succeeds', () => {
      const schema = validation['schema'] as ObjectSchema<any>;
      const validationResult: ValidationResult<any> = {
        error: undefined,
        value: req.body,
      };
      jest.spyOn(schema, 'validate').mockReturnValueOnce(validationResult);

      validation.validate(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(res.sendStatus).not.toHaveBeenCalled();
      expect(logger.error).not.toHaveBeenCalled();
    });
    test('should log an error, send 400 status, and not call the next function if validation fails', () => {
      const schema = validation['schema'] as ObjectSchema<any>;
      const error: ValidationError = new Error(
        'Validation error'
      ) as ValidationError;
      error.isJoi = true;
      error.details = [];
      error.annotate = () => '';
      error._original = req.body;
      jest
        .spyOn(schema, 'validate')
        .mockReturnValueOnce({error, value: undefined});

      validation.validate(req, res, next);

      expect(logger.error).toHaveBeenCalledWith('validation error', error);
      expect(res.sendStatus).toHaveBeenCalledWith(400);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
