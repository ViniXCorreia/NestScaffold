import { Inject } from '@nestjs/common';
import {
	IChangePasswordUseCase,
} from './change-password.interface';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { CryptoService } from 'src/_shared/crypto/crypto.service';
import { ChangePasswordDto } from '../../infra/dto/in/change-password.dto';

export class ChangePasswordUseCase implements IChangePasswordUseCase {
	constructor(
		@Inject(RepositoryProxyModule.USER_REPOSITORY)
		private readonly userRepository: Repository<UserEntity>,
		private readonly cryptoService: CryptoService
	) {}

	async execute(reqUser: any, changePasswordDto: ChangePasswordDto): Promise<boolean> {
		const userId = reqUser.userId ?? reqUser.user?.id ?? reqUser.user;
		const findUser = await this.userRepository.findOneBy({
			id: userId,
		});
		const validPassword = this.cryptoService.comparePassword(
			changePasswordDto.currentPassword,
			findUser.password
		);
		if (!validPassword) {
			throw new Error('400-Senha incorreta!');
		}
		const newPassword = this.cryptoService.encryptPassword(changePasswordDto.newPassword);
		findUser.password = newPassword;
		await this.userRepository.save(findUser);
		return true;
	}
}
