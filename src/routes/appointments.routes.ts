import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmetsRepository from '../repositories/AppointmetsRepository';
import CreateAppointmentService from '../service/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmetsRepository();

// Rota: precisa preoculpar apenas com receber a requisiçao, chamar outro arquivo, devolver uma resposta.

// Lista todos os agendamentos
appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

// Criar um agendamento
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      date: parsedDate,
      provider,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ erro: error.message });
  }
});
export default appointmentsRouter;
