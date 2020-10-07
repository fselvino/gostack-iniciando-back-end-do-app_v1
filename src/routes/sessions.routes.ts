import { Router } from 'express';

import AuthenticateUserService from '../service/AuthenticateUserService';
import UserMap from '../mappers/UserMap';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    const mappedUser = UserMap.toDTO(user);

    return response.json({ mappedUser, token });
  } catch (error) {
    return response.status(400).json({ erro: error.message });
  }
});
export default sessionsRouter;
