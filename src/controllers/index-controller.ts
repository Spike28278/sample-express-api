import {Request, Response} from 'express';
import {Logger} from 'winston';
import {inject, injectable} from 'tsyringe';
import {DIToken} from '../constants';

@injectable()
export class IndexController {
  private logger: Logger;

  constructor(@inject(DIToken.Logger) logger: Logger) {
    this.logger = logger;
  }

  public healthCheck = async (req: Request, res: Response): Promise<void> => {
    this.logger.info('Received health check request');
    res.status(200).send({status: 'available'});
  };
}
