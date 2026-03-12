import { Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import {
	IFindOneUserByEmailUseCase,
} from './findOneUserByEmail.interface';

export class FindOneUserByEmailUseCase
	implements IFindOneUserByEmailUseCase
{
	logger = new Logger();
	constructor(
		@Inject(RepositoryProxyModule.USER_REPOSITORY)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async execute(
		email: string
	): Promise<UserEntity> {
		try {
			const findPerson = await this.userRepository.findOne({
				where: {
					email: email,
				},
				relations: ['address', 'roles'],
			});
			if (findPerson) {
				return findPerson;
			}
			throw new NotFoundException('Usuário não encontrado!');
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
