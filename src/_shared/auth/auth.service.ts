import { Logger, forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { UserService } from 'src/_modules/user/infra/controller/user.service';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);

	constructor(
		@Inject(forwardRef(() => UserService))
		private userService: UserService,
		private jwtService: JwtService,
		private cryptoService: CryptoService
	) { }

	async validateUser(
		email: string,
		password: string
	): Promise<UserEntity | null> {
		let findUser: UserEntity;

		try {
			findUser = await this.userService.findOneUserByEmail(email);
		} catch (error) {
			this.logger.warn(`Falha no login para ${email}: usuário não encontrado.`);
			return null;
		}

		if (!findUser.validate) {
			this.logger.warn(`Falha no login para ${email}: conta não validada.`);
			return null;
		}
		const validPassword = this.cryptoService.comparePassword(
			password,
			findUser.password
		);
		if (findUser && validPassword) {
			return findUser;
		}

		this.logger.warn(`Falha no login para ${email}: credenciais inválidas.`);
		return null;
	}

	async login(user: any) {
		const roles = user.roles
			.map((role: any) => role?.id)
			.filter((roleId: any) => roleId != null);

		return this.jwtService.signAsync({
			user: {
				id: user.id,
				roles,
			}
		});
	}

	async setRole(user: any, role: string) {
		user.role = role;
		return await this.jwtService.signAsync(user);
	}

	async decodeToken(token: string) {
		const decoded = this.jwtService.decode(token);
		return decoded;
	}
}
