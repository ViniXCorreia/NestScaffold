import { Inject } from '@nestjs/common';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { AuthService } from 'src/_shared/auth/auth.service';
import { LoginPersonResponseDto } from '../../infra/dto/out/login-response.dto';
import { ILoginUseCase } from './login.interface';

export class LoginUseCase implements ILoginUseCase {
	constructor(
		@Inject(AuthService)
		private readonly authService: AuthService
	) { }

	async execute(loginUser: UserEntity): Promise<LoginPersonResponseDto> {
		const accessToken = await this.authService.login(loginUser);
		let userRoles = loginUser.roles;
		if (userRoles.length == 0) {
			throw new Error('401-Usuário inválido.');
		}
		return { accessToken };
	}
}
