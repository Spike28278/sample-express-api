import {Router} from 'express';
import {IRoute} from '../models/route';
import {Index} from '../controllers';
import {inject, injectable} from 'tsyringe';
import {DIToken} from '../constants';
import Validation from '../middleware/validation';
import {IMessage} from '../models/message';

@injectable()
export class Route implements IRoute {
  segment = '/';
  router: Router;
  private indexController: Index;
  private messageValidator: Validation<IMessage>;

  constructor(
    @inject(DIToken.Router) router: Router,
    indexController: Index,
    @inject(DIToken.MessageValidator) validationHandler: Validation<IMessage>
  ) {
    this.router = router;
    this.indexController = indexController;
    this.messageValidator = validationHandler;

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.segment}`, this.indexController.healthCheck);

    this.router.post(
      `${this.segment}`,
      this.messageValidator.validate,
      this.indexController.postAction
    );
  }
}
