import { IFindAllUsersResponseDTO } from '../../infra/dto/out/findAllUsers-response.dto';
import { IFindAllUsersDTO } from '../../infra/dto/in/findAllUsers.dto';

export const FIND_ALL_USERS_USE_CASE = 'FindAllUsersUseCase';

export interface IFindAllUsersUseCase {
	execute(
		findAllUsersDto: IFindAllUsersDTO
	): Promise<IFindAllUsersResponseDTO>;
}
