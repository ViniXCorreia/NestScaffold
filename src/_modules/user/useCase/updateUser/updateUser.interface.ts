import { UserEntity } from 'src/infra/database/entities/user.entity';
import { UpdateUserDto } from '../../infra/dto/in/update-user.dto';

export const UPDATE_USER_USE_CASE = 'UpdateUserUseCase';

export interface IUpdateUserUseCase {
	execute(
		documentNumber: string,
		updateUserDto: UpdateUserDto,
		reqUser: any
	): Promise<UserEntity>;
}
