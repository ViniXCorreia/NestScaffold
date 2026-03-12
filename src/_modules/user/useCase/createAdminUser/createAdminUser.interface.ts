import { UserEntity } from 'src/infra/database/entities/user.entity';
import { CreateAdminUserDto } from '../../infra/dto/in/create-admin-user.dto';

export const CREATE_ADMIN_USER_USE_CASE = 'CreateAdminUserUseCase';

export interface ICreateAdminUserUseCase {
	execute(createAdminUserDto: CreateAdminUserDto): Promise<UserEntity>;
}
