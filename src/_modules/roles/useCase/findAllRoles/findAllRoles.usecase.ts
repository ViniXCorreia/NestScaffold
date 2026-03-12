import { Inject, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/infra/database/entities/role.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { IFindAllRolesUseCase } from './findAllRoles.interface';

export class FindAllRolesUseCase implements IFindAllRolesUseCase {
	private readonly logger = new Logger(FindAllRolesUseCase.name);

	constructor(
		@Inject(RepositoryProxyModule.ROLE_REPOSITORY)
		private readonly roleRepository: Repository<RoleEntity>
	) {}

	async execute(): Promise<RoleEntity[]> {
		try {
			return await this.roleRepository.find();
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
