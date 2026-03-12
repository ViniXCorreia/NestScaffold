export const FORGOT_PASSWORD_USECASE = 'ForgotPasswordUsecase';

export interface IForgotPasswordUsecase {
	execute(email: string): Promise<boolean>;
}
