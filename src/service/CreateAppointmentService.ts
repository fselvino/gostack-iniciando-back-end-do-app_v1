import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmetsRepository';

/**
 * [x] Recebimento da informaçoes
 * [x] Tratativa de erros/excessoes
 * [x] Acesso ao repositorio
 */

interface Request {
  provider: string;
  date: Date;
}

/**
 * Já aplicamos os segintes pricipios do SOLID
 * Sigle Responsability Principle
 * Dependency Inversion
 */
class CreateAppointmentService {
  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );
    // validaçao para não ter duas data/horas iguais
    // se foi encontrado findAppointmentInSameDate e porque tem um horario agendado para esse horario então retorna erro
    if (findAppointmentInSameDate) {
      throw Error('This appointmet is already booked');
    }

    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
