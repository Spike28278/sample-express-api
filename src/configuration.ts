import {IAppConfig} from './models/app-config';

export function generateAppConfig(): IAppConfig {
  return {
    serviceName: process.env.npm_package_name ?? '',
    port: process.env.PORT ? Number(process.env.PORT) : 3030,
    basePath: process.env.BASE_PATH ?? '',
  };
}