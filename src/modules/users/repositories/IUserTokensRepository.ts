import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;
}

export default IUserTokensRepository;
