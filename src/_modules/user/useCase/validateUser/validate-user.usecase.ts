import { Inject } from '@nestjs/common';
import {
	IValidateUserUseCase,
} from './validate-user.interface';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infra/database/entities/user.entity';

export class ValidateUserUseCase implements IValidateUserUseCase {
	constructor(
		@Inject(RepositoryProxyModule.USER_REPOSITORY)
		private readonly userRepository: Repository<UserEntity>
	) {}
	async execute(id: number): Promise<string> {
		const findPerson = await this.userRepository.findOneBy({
			id: id,
		});
		if (!findPerson) {
			throw new Error('400-Usuário não localizado');
		}
		if (findPerson.validate) {
			throw new Error('400-Usuário já ativo');
		}
		await this.userRepository.update(findPerson.id, { validate: true });
		return "Email validado com sucesso!";
	}
}
