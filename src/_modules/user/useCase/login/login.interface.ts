import { UserEntity } from 'src/infra/database/entities/user.entity';
import { LoginPersonResponseDto } from '../../infra/dto/out/login-response.dto';

export const LOGIN_USECASE = 'ILoginUseCase';

export interface ILoginUseCase {
	execute(loginUser: UserEntity): Promise<LoginPersonResponseDto>;
}
