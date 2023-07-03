import {Request, Response} from 'express';
import {Logger} from 'winston';
import {IndexController} from './index-controller';
import {DIToken} from '../constants';

describe('IndexController', () => {
  let index: IndexController;
  let req: Request;
  let res: Response;
  let logger: Logger;

  beforeEach(() => {
    logger = {info: jest.fn()} as unknown as Logger;

    index = new IndexController(logger);

    req = {} as Request;
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('healthCheck', () => {
    test('should log the health check request and send a 200 response with the status', () => {
      index.healthCheck(req, res);

      expect(logger.info).toHaveBeenCalledWith('Received health check request');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({status: 'available'});
    });
  });
});
