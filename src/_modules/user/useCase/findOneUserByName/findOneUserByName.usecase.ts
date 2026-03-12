import { Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { NotFoundException } from '@nestjs/common/exceptions';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import {
	IFindOneUserByNameUseCase,
} from './findOneUserByName.interface';

export class FindOneUserByNameUseCase implements IFindOneUserByNameUseCase {
	logger = new Logger();
	constructor(
		@Inject(RepositoryProxyModule.USER_REPOSITORY)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async execute(
		name: string
	): Promise<UserEntity> {
		try {
			const findUser = await this.userRepository.findOne({
				where: {
					name: name,
				},
			});
			if (findUser) {
				return findUser;
			}
			throw new NotFoundException('Usuário não encontrado');
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
