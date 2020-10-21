import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import CreateAppointmentService from '../service/CreateAppointmentService';
import AppointmentsRepositoriy from '../repositories/AppointmetsRepository';

import ensureAuthenticaded from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// Rota: precisa preoculpar apenas com receber a requisiçao, chamar outro arquivo, devolver uma resposta.

// Lista todos os agendamentos

appointmentsRouter.use(ensureAuthenticaded);

appointmentsRouter.get('/', async (request, response) => {
  // console.log(request.user);
  const appointmentsRepository = getCustomRepository(AppointmentsRepositoriy);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

// Criar um agendamento
appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ erro: error.message });
  }
});
export default appointmentsRouter;
