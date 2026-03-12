export const VALIDATE_USER_USECASE = 'ValidateUserUseCase';

export interface IValidateUserUseCase {
	execute(id: number): Promise<string>;
}
