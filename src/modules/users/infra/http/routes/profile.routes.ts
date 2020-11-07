import { Router } from 'express';
import ensureAuthenicated from '@modules/users/infra/http/middlewares/ensureAuthenicated';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenicated);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
