import {Router} from 'express';

export interface IRoute {
  segment: string;
  router: Router;
}
