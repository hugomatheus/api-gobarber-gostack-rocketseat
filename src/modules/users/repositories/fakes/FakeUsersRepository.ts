import { v4 as uuidv4 } from 'uuid';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuidv4() }, userData);
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    this.users.map(element => (element.id === user.id ? user : element));
    // const indexUser = this.users.findIndex(element => element.id === user.id);
    // this.users[indexUser] = user;
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(element => element.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(element => element.email === email);
    return user;
  }
}

export default FakeUsersRepository;
