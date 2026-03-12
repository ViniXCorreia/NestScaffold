import { Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators/core/inject.decorator';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { Repository } from 'typeorm';
import {
	IFindAllUsersUseCase,
} from './findAllUsers.interface';
import { IFindAllUsersDTO } from '../../infra/dto/in/findAllUsers.dto';
import { IFindAllUsersResponseDTO } from '../../infra/dto/out/findAllUsers-response.dto';

export class FindAllUsersUseCase implements IFindAllUsersUseCase {
	logger = new Logger();
	constructor(
		@Inject(RepositoryProxyModule.USER_REPOSITORY)
		private readonly personRepository: Repository<UserEntity>
	) {}
	async execute(
		findAllUsersDto: IFindAllUsersDTO
	): Promise<IFindAllUsersResponseDTO> {
		try {
			const pageNumber = Math.max(1, Number(findAllUsersDto?.pageNumber) || 1);
			const pageSize = Math.max(1, Number(findAllUsersDto?.pageSize) || 10);

			const [items, totalItems] = await this.personRepository.findAndCount({
				relations: ['address', 'roles'],
				skip: (pageNumber - 1) * pageSize,
				take: pageSize,
			});

			return {
				items,
				pageNumber,
				pageSize,
				totalItems,
				totalPages: Math.ceil(totalItems / pageSize) || 1,
			};
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
