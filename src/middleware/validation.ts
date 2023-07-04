import {inject, injectable} from 'tsyringe';
import {NextFunction, Request, Response} from 'express';
import {Logger} from 'winston';
import {DIToken} from '../constants';
import {ObjectSchema} from 'joi';

@injectable()
export class Validation<T> {
  constructor(
    private readonly schema: ObjectSchema<T>,
    @inject(DIToken.Logger) private logger: Logger
  ) {}

  validate = (req: Request, res: Response, next: NextFunction) => {
    const result = this.schema.validate(req.body);

    if (result?.error) {
      this.logger.error('validation error', result.error);
      res.status(400).send({
        error: result.error.details?.[0]?.message || 'Validation error',
      });
      return;
    }
    return next();
  };
}
