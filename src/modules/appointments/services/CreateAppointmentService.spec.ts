import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointmentService.execute({
      provider_id: '123456',
      user_id: '123123',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment).toHaveProperty('provider_id');
    expect(appointment).toHaveProperty('date');
    expect(appointment.provider_id).toBe('123456');
  });

  it('should not be able to create a two appointments on the same time', async () => {
    const appointmentDate = new Date();

    await createAppointmentService.execute({
      provider_id: '123456',
      user_id: '123123',
      date: appointmentDate,
    });

    await expect(
      createAppointmentService.execute({
        provider_id: '1234561',
        user_id: '123123',
        date: appointmentDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
