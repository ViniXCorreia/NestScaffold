import { UserEntity } from 'src/infra/database/entities/user.entity';

export interface IFindOneUserByNameUseCase {
	execute(name: string): Promise<UserEntity>;
}
