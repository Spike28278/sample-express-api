import {inject, injectable} from 'tsyringe';
import {NextFunction, Request, Response} from 'express';
import {Logger} from 'winston';
import {DIToken} from '../constants';
import {Validator} from 'fluentvalidation-ts';

@injectable()
export class Validation<T> {
  constructor(
    private readonly validator: Validator<T>,
    @inject(DIToken.Logger) private logger: Logger
  ) {}

  validate = (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = this.validator.validate(req.body);

    if (Object.keys(validationErrors).length > 0) {
      this.logger.error('validation error', validationErrors);
      res.sendStatus(400);
      return;
    }
    return next();
  };
}

export default Validation;
