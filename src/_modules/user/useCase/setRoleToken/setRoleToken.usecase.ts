import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/_shared/auth/auth.service';
import { LoginPersonResponseDto } from '../../infra/dto/out/login-response.dto';
import { ISetRoleUseCase, ISetRoleUseCaseInput } from './setRoleToken.interface';
import { Repository } from 'typeorm';
import { RoleEntity } from 'src/infra/database/entities/role.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';

export class SetRoleUseCase implements ISetRoleUseCase {
	logger = new Logger();
	constructor(
		@Inject(AuthService)
		private readonly authService: AuthService,
		@Inject(RepositoryProxyModule.ROLE_REPOSITORY)
		private readonly roleRepository: Repository<RoleEntity>
	) {}

	async execute(data: ISetRoleUseCaseInput): Promise<LoginPersonResponseDto> {
		try {
			const findRoleIfExists = await this.roleRepository.findOneBy({
				description: data.role
			})
			if(!findRoleIfExists) throw new NotFoundException("Role Inexistente")
			const accessToken = await this.authService.setRole(data.loginUser, data.role);
			return { accessToken };
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
