import { UserEntity } from 'src/infra/database/entities/user.entity';

export interface IFindOneUserByIdUseCase {
	execute(id: number): Promise<UserEntity>;
}
