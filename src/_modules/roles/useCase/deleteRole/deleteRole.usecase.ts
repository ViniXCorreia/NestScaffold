import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/infra/database/entities/role.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { IDeleteRoleUseCase } from './deleteRole.interface';

export class DeleteRoleUseCase implements IDeleteRoleUseCase {
	private readonly logger = new Logger(DeleteRoleUseCase.name);

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

			return await this.roleRepository.remove(findRole);
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
