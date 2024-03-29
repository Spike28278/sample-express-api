import 'reflect-metadata';
import {container} from 'tsyringe';
import dotenv from 'dotenv';
import {App} from './app';
import express, {Express, Router} from 'express';
import {DIToken, Environment} from './constants';
import winston, {Logger} from 'winston';
import {IAppConfig} from './models/app-config';
import {generateAppConfig} from './configuration';
import {IRoute} from './models/route';
import {IndexRoute} from './routes/index-route';

(async (): Promise<void> => {
  dotenv.config();
  const appConfig = generateAppConfig();

  container.register<Logger>(DIToken.Logger, {
    useFactory: () => {
      return winston.createLogger({
        level:
          process.env.NODE_ENV === Environment.Development ? 'debug' : 'info',
        transports: [new winston.transports.Console()],
      });
    },
  });

  container.register<IAppConfig>(DIToken.AppConfig, {
    useValue: appConfig,
  });

  container.register<IRoute[]>(DIToken.Routes, {
    useFactory: () => {
      return [container.resolve(IndexRoute)];
    },
  });

  container.register<Express>(DIToken.Express, {useFactory: () => express()});
  container.register<Router>(DIToken.Router, {useFactory: () => Router()});

  const app = container.resolve(App);
  app.start();
})().catch(err => console.error(err));
