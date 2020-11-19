import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ensureAuthenicated from '@modules/users/infra/http/middlewares/ensureAuthenicated';
import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '@modules/appointments/infra/http/controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenicated);

appointmentsRouter.get('/', appointmentsController.index);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create,
);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;
