import {Router} from 'express';
import {IRoute} from '../models/route';
import {Index} from '../controllers';
import {inject, injectable} from 'tsyringe';
import {DIToken} from '../constants';

@injectable()
export class Route implements IRoute {
  segment = '/';
  router: Router;
  private indexController: Index;

  constructor(@inject(DIToken.Router) router: Router, indexController: Index) {
    this.router = router;
    this.indexController = indexController;

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.segment}`, this.indexController.healthCheck);
  }
}
