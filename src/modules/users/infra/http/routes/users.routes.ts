import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ensureAuthenicated from '@modules/users/infra/http/middlewares/ensureAuthenicated';
import UsersController from '@modules/users/infra/http/controllers/UsersController';
import UserAvatarController from '@modules/users/infra/http/controllers/UserAvatarController';

const usersRouter = Router();

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  ensureAuthenicated,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
