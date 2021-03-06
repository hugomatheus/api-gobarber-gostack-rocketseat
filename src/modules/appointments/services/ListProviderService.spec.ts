import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProviderService from '@modules/appointments/services/ListProviderService';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let listProviderService: ListProviderService;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProvider', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviderService = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to show providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Hugo',
      email: 'hugo_targino@outlook.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Paulo',
      email: 'paulo@outlook.com',
      password: '123456',
    });

    const userLogin = await fakeUsersRepository.create({
      name: 'Rafael',
      email: 'rafael@outlook.com',
      password: '123456',
    });

    const providers = await listProviderService.execute({
      user_id: userLogin.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
