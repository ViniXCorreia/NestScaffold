import { LoginPersonResponseDto } from '../../infra/dto/out/login-response.dto';

export const SET_ROLE_USE_CASE = 'SetRoleUseCase';

export interface ISetRoleUseCaseInput {
	loginUser: any;
	role: string;
}

export interface ISetRoleUseCase {
	execute(data: ISetRoleUseCaseInput): Promise<LoginPersonResponseDto>;
}
