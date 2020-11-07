import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(fakeUsersRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Hugo',
      email: 'hugo_targino@outlook.com',
      password: '123456',
    });

    const showUser = await showProfileService.execute({
      user_id: user.id,
    });

    expect(showUser.name).toBe('Hugo');
    expect(showUser.email).toBe('hugo_targino@outlook.com');
  });

  it('should not be able to show profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'user.id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
