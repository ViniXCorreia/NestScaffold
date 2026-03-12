import {
	ConflictException,
	Inject,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/infra/database/entities/role.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { UpdateRoleDto } from '../../infra/dto/in/update-role.dto';
import { IUpdateRoleUseCase } from './updateRole.interface';

export class UpdateRoleUseCase implements IUpdateRoleUseCase {
	private readonly logger = new Logger(UpdateRoleUseCase.name);

	constructor(
		@Inject(RepositoryProxyModule.ROLE_REPOSITORY)
		private readonly roleRepository: Repository<RoleEntity>
	) {}

	async execute(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
		try {
			const findRole = await this.roleRepository.findOneBy({ id });

			if (!findRole) {
				throw new NotFoundException('Role não encontrada!');
			}

			if (updateRoleDto.description) {
				const roleWithSameDescription = await this.roleRepository.findOneBy({
					description: updateRoleDto.description,
				});

				if (roleWithSameDescription && roleWithSameDescription.id !== id) {
					throw new ConflictException(
						'Já existe uma role cadastrada com essa descrição.'
					);
				}
			}

			await this.roleRepository.update(id, updateRoleDto);

			return await this.roleRepository.findOneBy({ id });
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
