import { UserEntity } from 'src/infra/database/entities/user.entity';
import { CreateUserDto } from '../../infra/dto/in/create-user.dto';

export const CREATE_USER_USE_CASE = 'CreateUserUseCase';

export interface ICreateUserUseCase {
	execute(createUserDto: CreateUserDto): Promise<UserEntity>;
}
