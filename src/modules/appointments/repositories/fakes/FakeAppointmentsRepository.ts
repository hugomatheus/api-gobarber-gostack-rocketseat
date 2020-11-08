import { v4 as uuidv4 } from 'uuid';
import { getMonth, getYear, isEqual } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuidv4(), provider_id, date });
    // Mesmo que:
    // appointment.id = uuidv4();
    // appointment.provider_id = provider_id;
    // appointment.date = date;

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(element =>
      isEqual(element.date, date),
    );
    return findAppointment;
  }

  public async find(): Promise<Appointment[] | undefined> {
    const { appointments } = this;
    return appointments;
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      element =>
        element.provider_id === provider_id &&
        getMonth(element.date) + 1 === month &&
        getYear(element.date) === year,
    );
    return appointments;
  }
}

export default FakeAppointmentsRepository;
