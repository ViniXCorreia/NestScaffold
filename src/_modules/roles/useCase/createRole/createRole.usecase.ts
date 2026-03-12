import { ConflictException, Inject, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/infra/database/entities/role.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { ICreateRoleUseCase } from './createRole.interface';
import { CreateRoleDto } from '../../infra/dto/in/create-role.dto';

export class CreateRoleUseCase implements ICreateRoleUseCase {
	private readonly logger = new Logger(CreateRoleUseCase.name);

	constructor(
		@Inject(RepositoryProxyModule.ROLE_REPOSITORY)
		private readonly roleRepository: Repository<RoleEntity>
	) {}

	async execute(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
		try {
			const roleExists = await this.roleRepository.findOneBy({
				description: createRoleDto.description.toUpperCase(),
			});

			if (roleExists) {
				throw new ConflictException(
					'Já existe uma role cadastrada com essa descrição.'
				);
			}

			const newRole = this.roleRepository.create(createRoleDto);
			newRole.description = newRole.description.toUpperCase();

			return await this.roleRepository.save(newRole);
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
