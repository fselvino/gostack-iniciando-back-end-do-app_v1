import { Router } from 'express';

import multer from 'multer';
import CreateUserService from '../service/CreateUserService';
import UserMap from '../mappers/UserMap';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UploadUserAvatarService from '../service/UpdateUserAvatarService';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const creatUser = new CreateUserService();

    const user = await creatUser.execute({
      name,
      email,
      password,
    });

    // Mapa do retorno para aplicacao - foi excluido o password no retono
    const mappedUser = UserMap.toDTO(user);

    return response.json(mappedUser);
  } catch (error) {
    return response.status(400).json({ erro: error.message });
  }
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateUserAvatar = new UpdateUserAvatarService();

      const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      });

      return response.json(UserMap.toAvatar(user));
      // return response.json(user);
    } catch (error) {
      return response.status(400).json({ erro: error.message });
    }
  },
);
export default usersRouter;
