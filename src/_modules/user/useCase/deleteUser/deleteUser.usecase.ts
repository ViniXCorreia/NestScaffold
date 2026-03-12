import {
	NotFoundException,
	Inject,
	Logger,
} from '@nestjs/common';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import {
	IDeleteUserByDocumentNumberUseCase,
} from './deleteUser.interface';

export class DeleteUserByDocumentNumberUseCase
	implements IDeleteUserByDocumentNumberUseCase
{
	logger = new Logger();
	constructor(
		@Inject(RepositoryProxyModule.USER_REPOSITORY)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async execute(
		documentNumber: string
	): Promise<UserEntity> {
		try {
			const findPersonIfExists = await this.userRepository.findOneBy({
				documentNumber: documentNumber,
			});
			if (findPersonIfExists) {
				return await this.userRepository.remove(findPersonIfExists);
			}
			throw new NotFoundException('Usuário não localizado!');
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
