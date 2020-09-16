import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ensureAuthenicated from '@modules/users/infra/http/middlewares/ensureAuthenicated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenicated);

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();

  const appointments = await appointmentsRepository.find();
  response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);

  const appointmentsRepository = new AppointmentsRepository();

  const createAppointmentService = new CreateAppointmentService(
    appointmentsRepository,
  );

  const appointment = await createAppointmentService.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
