import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../config/upload';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenicated from '../middlewares/ensureAuthenicated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserService();
  const user = await createUserService.execute({ name, email, password });

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenicated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = new UpdateUserAvatarService();
    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });
    return response.json(user);
  },
);

export default usersRouter;
