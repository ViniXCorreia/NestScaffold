import { UserEntity } from 'src/infra/database/entities/user.entity';

export const FIND_USER_BY_EMAIL_USE_CASE = 'FindPersonByEmailUseCase';

export interface IFindOneUserByEmailUseCase {
	execute(
		email: string
	): Promise<UserEntity>;
}
