import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import {
	IUpdateUserUseCase,
} from './updateUser.interface';
import {
	ForbiddenException,
	Inject,
	Logger,
	NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import { UpdateUserDto } from '../../infra/dto/in/update-user.dto';
import { RoleEntity } from 'src/infra/database/entities/role.entity';
import { CryptoService } from 'src/_shared/crypto/crypto.service';

export class UpdateUserUseCase implements IUpdateUserUseCase {
	private static readonly ADMIN_ROLE_ID = 1;
	logger = new Logger();
	constructor(
		@Inject(RepositoryProxyModule.USER_REPOSITORY)
		private readonly userRepository: Repository<UserEntity>,
		@Inject(RepositoryProxyModule.ROLE_REPOSITORY)
		private readonly roleRepository: Repository<RoleEntity>,
		private readonly cryptoService: CryptoService
	) {}

	private isAdmin(reqUser: any): boolean {
		const roleIds = Array.isArray(reqUser?.roles)
			? reqUser.roles
			: Array.isArray(reqUser?.user?.roles)
				? reqUser.user.roles
				: [];

		return (
			reqUser?.role === 'ADMIN' ||
			roleIds.includes(UpdateUserUseCase.ADMIN_ROLE_ID)
		);
	}

	async execute(
		documentNumber: string,
		updateUserDto: UpdateUserDto,
		reqUser: any
	): Promise<UserEntity> {
		try {
			const findUserIfExists = await this.userRepository.findOne({
				where: {
					documentNumber: documentNumber,
				},
				relations: ['address', 'roles'],
			});
			if (!findUserIfExists) {
				throw new NotFoundException('Usuário não encontrado!');
			}

			const { roleId, address, ...userData } = updateUserDto;

			if (userData.password) {
				userData.password = this.cryptoService.encryptPassword(userData.password);
			}

			if (roleId !== undefined) {
				const role = await this.roleRepository.findOneBy({ id: roleId });
				if (!role) {
					throw new NotFoundException('Role não encontrada!');
				}

				if (role.description === 'ADMIN' && !this.isAdmin(reqUser)) {
					throw new ForbiddenException(
						'Apenas usuários ADMIN podem promover outro usuário para ADMIN.'
					);
				}

				findUserIfExists.roles = [role];
			}

			Object.assign(findUserIfExists, userData);
			if (address) {
				findUserIfExists.address = {
					...findUserIfExists.address,
					...address,
				};
			}

			await this.userRepository.save(findUserIfExists);

			const updatedUser = await this.userRepository.findOne({
				where: { id: findUserIfExists.id },
				relations: ['address', 'roles'],
			});

			if (!updatedUser) {
				throw new NotFoundException('Usuário não encontrado!');
			}

			return updatedUser;
		} catch (error) {
			this.logger.error(JSON.stringify(error));
			throw error;
		}
	}
}
