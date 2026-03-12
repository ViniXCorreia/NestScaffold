import { ConflictException, Inject, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CryptoService } from 'src/_shared/crypto/crypto.service';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { RoleEntity } from 'src/infra/database/entities/role.entity';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { CreateAdminUserDto } from '../../infra/dto/in/create-admin-user.dto';
import { ICreateAdminUserUseCase } from './createAdminUser.interface';

export class CreateAdminUserUseCase implements ICreateAdminUserUseCase {
	private readonly logger = new Logger(CreateAdminUserUseCase.name);

	constructor(
		@Inject(RepositoryProxyModule.USER_REPOSITORY)
		private readonly userRepository: Repository<UserEntity>,
		@Inject(RepositoryProxyModule.ROLE_REPOSITORY)
		private readonly roleRepository: Repository<RoleEntity>,
		private readonly cryptoService: CryptoService
	) {}

	async execute(createAdminUserDto: CreateAdminUserDto): Promise<UserEntity> {
		try {
			const userExists = await this.userRepository.findOne({
				where: { email: createAdminUserDto.email },
			});

			if (userExists) {
				throw new ConflictException('Já existe um usuário cadastrado');
			}

			const adminRole = await this.roleRepository.findOneBy({ id: 1 });

			if (!adminRole) {
				throw new NotFoundException('Role ADMIN não encontrada');
			}

			const encryptedPassword = this.cryptoService.encryptPassword(
				createAdminUserDto.password
			);

			const newAdminUser = this.userRepository.create({
				...createAdminUserDto,
				password: encryptedPassword,
				roles: [adminRole],
			});

			return await this.userRepository.save(newAdminUser);
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
