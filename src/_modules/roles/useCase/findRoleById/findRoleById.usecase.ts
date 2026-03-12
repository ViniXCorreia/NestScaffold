import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/infra/database/entities/role.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { IFindRoleByIdUseCase } from './findRoleById.interface';

export class FindRoleByIdUseCase implements IFindRoleByIdUseCase {
	private readonly logger = new Logger(FindRoleByIdUseCase.name);

	constructor(
		@Inject(RepositoryProxyModule.ROLE_REPOSITORY)
		private readonly roleRepository: Repository<RoleEntity>
	) {}

	async execute(id: number): Promise<RoleEntity> {
		try {
			const findRole = await this.roleRepository.findOneBy({ id });

			if (!findRole) {
				throw new NotFoundException('Role não encontrada!');
			}

			return findRole;
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
