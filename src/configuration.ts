import {IAppConfig} from './models/app-config';

export function generateAppConfig(): IAppConfig {
  if (
    !process.env.npm_package_name ||
    !process.env.PORT ||
    !process.env.BASE_PATH
  ) {
    throw new Error('One or more environment variables are missing!');
  }

  return {
    serviceName: process.env.npm_package_name,
    port: Number(process.env.PORT),
    basePath: process.env.BASE_PATH,
  };
}
