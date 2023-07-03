import {IRoute} from './models/route';
import express, {Express, NextFunction, Request, Response} from 'express';
import cors from 'cors';
import helmet from 'helmet';
import {Logger} from 'winston';
import {IAppConfig} from './models/app-config';
import {inject, injectable} from 'tsyringe';
import {DIToken} from './constants';

@injectable()
export class App {
  private app: Express;
  private logger: Logger;
  private routes: IRoute[];
  private config: IAppConfig;

  constructor(
    @inject(DIToken.Express) app: Express,
    @inject(DIToken.Logger) logger: Logger,
    @inject(DIToken.Routes) routes: IRoute[],
    @inject(DIToken.AppConfig) config: IAppConfig
  ) {
    this.app = app;
    this.logger = logger;
    this.routes = routes;
    this.config = config;
  }

  public start(): void {
    this.initializeMiddlewares();
    this.initializeRoutes();

    // Error handling. Must be registered after all routes and middleware
    this.app.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        this.logger.error(err);
        res.status(500);
      }
    );

    this.app.listen(this.config.port, () => {
      this.logger.info(
        `${this.config.serviceName} listening on port: ${this.config.port}`
      );
    });
  }

  private initializeRoutes(): void {
    this.routes.forEach(route => {
      this.app.use(this.config.basePath, route.router);
    });
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
  }
}

export default App;
