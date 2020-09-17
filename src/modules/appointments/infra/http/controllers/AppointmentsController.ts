import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import { container } from 'tsyringe';

class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const appointmentsRepository = new AppointmentsRepository();

    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}

export default AppointmentsController;
