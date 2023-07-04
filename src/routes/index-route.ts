import {Router} from 'express';
import {IRoute} from '../models/route';
import {IndexController} from '../controllers/index-controller';
import {inject, injectable} from 'tsyringe';
import {DIToken} from '../constants';

@injectable()
export class IndexRoute implements IRoute {
  segment = '/';
  router: Router;
  private indexController: IndexController;

  constructor(
    @inject(DIToken.Router) router: Router,
    indexController: IndexController
  ) {
    this.router = router;
    this.indexController = indexController;

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.segment}`, this.indexController.healthCheck);
  }
}
