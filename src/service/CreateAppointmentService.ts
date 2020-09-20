import { startOfHour } from 'date-fns';

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
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    // validaçao para não ter duas data/horas iguais
    // se foi encontrado findAppointInSameDate e porque tem um horario agendado para esse horario então retorna erro
    if (findAppointmentInSameDate) {
      throw Error('This appointmet is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
