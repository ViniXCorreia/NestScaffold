import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { UserService } from 'src/_modules/user/infra/controller/user.service';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class AuthService {
	constructor(
		@Inject(forwardRef(() => UserService))
		private userService: UserService,
		private jwtService: JwtService,
		private cryptoService: CryptoService
	) { }

	async validateUser(
		email: string,
		password: string
	): Promise<UserEntity | string> {
		const findUser = await this.userService.findOneUserByEmail(email);
		if (!findUser.validate) {
			return 'Ative sua conta!';
		}
		const validPassword = this.cryptoService.comparePassword(
			password,
			findUser.password
		);
		if (findUser && validPassword) {
			return findUser;
		}
		return null;
	}

	async login(user: any) {
		const roles = user.roles
			.map((role: any) => role?.id)
			.filter((roleId: any) => roleId != null);
		const roleNames = user.roles
			.map((role: any) => role?.description)
			.filter((roleName: any) => roleName != null);

		return this.jwtService.signAsync({
			user: {
				id: user.id,
				roles,
				roleNames,
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
