import { Router } from 'express';

import CreateUserService from '../service/CreateUserService';
import UserMap from '../mappers/UserMap';

const usersRouter = Router();

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
export default usersRouter;
