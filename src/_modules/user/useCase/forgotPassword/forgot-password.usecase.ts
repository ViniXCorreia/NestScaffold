import { Inject } from '@nestjs/common';
import {
	IForgotPasswordUsecase,
} from './forgot-password.interface';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { MailService } from 'src/_shared/mailModule/mail.service';
import { AuthService } from 'src/_shared/auth/auth.service';

export class ForgotPasswordUsecase implements IForgotPasswordUsecase {
	constructor(
		@Inject(RepositoryProxyModule.USER_REPOSITORY)
		private readonly personRepository: Repository<UserEntity>,
		private readonly mailService: MailService,
		private readonly authService: AuthService
	) {}
	async execute(email: string): Promise<boolean> {
		const findUser = await this.personRepository.findOneBy({
			email: email,
		});
		if (!findUser) {
			throw new Error('400-Usuário não encontrado');
		}

		const sendToken = await this.authService.login(findUser);
		this.mailService.sendMailForgotPassword(findUser.email, sendToken);
		return true;
	}
}
