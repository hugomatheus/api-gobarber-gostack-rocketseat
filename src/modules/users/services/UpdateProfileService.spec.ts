import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Hugo',
      email: 'hugo_targino@outlook.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Hugo edit',
      email: 'hugo_targino_edit@outlook.com',
    });

    expect(updatedUser.name).toBe('Hugo edit');
    expect(updatedUser.email).toBe('hugo_targino_edit@outlook.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Hugo',
      email: 'hugo_targino@outlook.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'Matheus',
      email: 'matheus@outlook.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Matheus edit',
        email: 'hugo_targino@outlook.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Hugo',
      email: 'hugo_targino@outlook.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Hugo edit',
      email: 'hugo_targino_edit@outlook.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Hugo',
      email: 'hugo_targino@outlook.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Hugo edit',
        email: 'hugo_targino_edit@outlook.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Hugo',
      email: 'hugo_targino@outlook.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Hugo edit',
        email: 'hugo_targino_edit@outlook.com',
        password: '123123',
        old_password: '111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile from non-existing user', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'user.id',
        name: 'Hugo edit',
        email: 'hugo_targino_edit@outlook.com',
        password: '123123',
        old_password: '111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
