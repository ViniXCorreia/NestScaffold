import { Inject, Logger } from '@nestjs/common';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import {
	IFindOneUserByIdUseCase,
} from './findOneUserById.interface';
import { NotFoundException } from '@nestjs/common/exceptions';

export class FindOneUserByIdUseCase implements IFindOneUserByIdUseCase {
	logger = new Logger();
	constructor(
		@Inject(RepositoryProxyModule.USER_REPOSITORY)
		private readonly userRepository: Repository<UserEntity>
	) {}

	async execute(
		id: number
	): Promise<UserEntity> {
		try {
			const findUser = await this.userRepository.findOne({
				where: {
					id: id,
				},
				relations: ['address', 'roles'],
			});

			if (findUser) {
				return findUser;
			}
			throw new NotFoundException('Usuário não encontrado!');
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
