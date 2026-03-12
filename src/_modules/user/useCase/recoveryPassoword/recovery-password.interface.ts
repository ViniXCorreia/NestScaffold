import { RecoveyPasswordDto } from '../../infra/dto/in/recovery-password.dto';

export const RECOVERY_PASSWORD_USECASE = 'RecoveryPasswordUseCase';

export interface IRecoveryPasswordDto {
	recoveryPassword: RecoveyPasswordDto;
}

export interface IRecoveryPasswordUseCase {
	execute(data: IRecoveryPasswordDto): Promise<boolean>;
}
