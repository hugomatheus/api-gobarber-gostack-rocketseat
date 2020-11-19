import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenicated from '@modules/users/infra/http/middlewares/ensureAuthenicated';
import ProfileController from '@modules/users/infra/http/controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensureAuthenicated);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);
profileRouter.get('/', profileController.show);

export default profileRouter;
