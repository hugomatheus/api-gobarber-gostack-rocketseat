import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Hugo',
      email: 'hugo@email.com.br',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'hugo@email.com.br',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'hugo@email.com.br',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with unset email or password', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'hugo@email.com.br',
        password: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be not able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Hugo',
      email: 'hugo@email.com.br',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'hugo@email.com.br',
        password: 'password-errado',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
