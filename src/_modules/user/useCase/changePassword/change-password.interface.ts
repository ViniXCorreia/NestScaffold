import { ChangePasswordDto } from "../../infra/dto/in/change-password.dto";

export const CHANGE_PASSWORD_USECASE = 'UpdatePasswordUsecase';

export interface IChangePasswordUseCase {
	execute(reqUser:any, changePassword: ChangePasswordDto): Promise<boolean>;
}
