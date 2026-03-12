import { Inject } from '@nestjs/common/decorators';
import { NotFoundException } from '@nestjs/common/exceptions';
import { Logger } from '@nestjs/common/services';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import {
	IFindOneUserByDocumentNumberUseCase,
} from './findOneUserByDocumentNumber.interface';

export class FindOneUserByDocumentNumberUseCase
	implements IFindOneUserByDocumentNumberUseCase
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
			const findPerson = await this.userRepository.findOne({
				where: {
					documentNumber: documentNumber,
				},
				relations: ['address', 'roles'],
			});
			if (findPerson) return findPerson;
			throw new NotFoundException('Usuário não encontrado');
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
