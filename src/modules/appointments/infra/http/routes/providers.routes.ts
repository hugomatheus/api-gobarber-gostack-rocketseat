import { Router } from 'express';
import ensureAuthenicated from '@modules/users/infra/http/middlewares/ensureAuthenicated';
import ProvidersController from '@modules/appointments/infra/http/controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();

providersRouter.use(ensureAuthenicated);

providersRouter.get('/', providersController.index);

export default providersRouter;
