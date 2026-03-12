import { Inject } from '@nestjs/common';
import {
	IRecoveryPasswordDto,
	IRecoveryPasswordUseCase,
} from './recovery-password.interface';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { CryptoService } from 'src/_shared/crypto/crypto.service';
import { AuthService } from 'src/_shared/auth/auth.service';

export class RecoveryPasswordUseCase implements IRecoveryPasswordUseCase {
	constructor(
		@Inject(RepositoryProxyModule.USER_REPOSITORY)
		private readonly userRepository: Repository<UserEntity>,
		private readonly cryptoService: CryptoService,
		private readonly authService: AuthService
	) {}
	async execute(data: IRecoveryPasswordDto): Promise<boolean> {
		const checkToken: any = await this.authService.decodeToken(
			data.recoveryPassword.token
		);
		if (!checkToken) {
			throw new Error('401-Ação não autorizada!');
		}
		const findPerson = await this.userRepository.findOneBy({
			id: checkToken.user,
		});
		const newPassword = this.cryptoService.encryptPassword(
			data.recoveryPassword.newPassword
		);
		await this.userRepository.update(findPerson.id, {
			password: newPassword,
		});

		return true;
	}
}
