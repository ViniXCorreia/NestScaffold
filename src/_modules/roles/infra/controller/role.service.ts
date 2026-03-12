import { HttpException, Inject, Injectable } from '@nestjs/common';
import { RoleEntity } from 'src/infra/database/entities/role.entity';
import {
	CREATE_ROLE_USE_CASE,
	ICreateRoleUseCase,
} from '../../useCase/createRole/createRole.interface';
import {
	DELETE_ROLE_USE_CASE,
	IDeleteRoleUseCase,
} from '../../useCase/deleteRole/deleteRole.interface';
import {
	FIND_ALL_ROLES_USE_CASE,
	IFindAllRolesUseCase,
} from '../../useCase/findAllRoles/findAllRoles.interface';
import {
	FIND_ROLE_BY_ID_USE_CASE,
	IFindRoleByIdUseCase,
} from '../../useCase/findRoleById/findRoleById.interface';
import {
	IUpdateRoleUseCase,
	UPDATE_ROLE_USE_CASE,
} from '../../useCase/updateRole/updateRole.interface';
import { CreateRoleDto } from '../dto/in/create-role.dto';
import { UpdateRoleDto } from '../dto/in/update-role.dto';

@Injectable()
export class RoleService {
	constructor(
		@Inject(CREATE_ROLE_USE_CASE)
		private readonly createRoleUseCase: ICreateRoleUseCase,
		@Inject(UPDATE_ROLE_USE_CASE)
		private readonly updateRoleUseCase: IUpdateRoleUseCase,
		@Inject(DELETE_ROLE_USE_CASE)
		private readonly deleteRoleUseCase: IDeleteRoleUseCase,
		@Inject(FIND_ROLE_BY_ID_USE_CASE)
		private readonly findRoleByIdUseCase: IFindRoleByIdUseCase,
		@Inject(FIND_ALL_ROLES_USE_CASE)
		private readonly findAllRolesUseCase: IFindAllRolesUseCase
	) {}

	async create(createRoleDto: CreateRoleDto): Promise<RoleEntity> {
		try {
			return await this.createRoleUseCase.execute(createRoleDto);
		} catch (e) {
			const [status, msg] = e.message.split('-');
			throw new HttpException(
				`${msg ?? 'Erro ao realizar consulta.'}`,
				Number(status) || 500
			);
		}
	}

	async update(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleEntity> {
		try {
			return await this.updateRoleUseCase.execute(id, updateRoleDto);
		} catch (e) {
			const [status, msg] = e.message.split('-');
			throw new HttpException(
				`${msg ?? 'Erro ao realizar consulta.'}`,
				Number(status) || 500
			);
		}
	}

	async remove(id: number): Promise<RoleEntity> {
		try {
			return await this.deleteRoleUseCase.execute(id);
		} catch (e) {
			const [status, msg] = e.message.split('-');
			throw new HttpException(
				`${msg ?? 'Erro ao realizar consulta.'}`,
				Number(status) || 500
			);
		}
	}

	async findById(id: number): Promise<RoleEntity> {
		try {
			return await this.findRoleByIdUseCase.execute(id);
		} catch (e) {
			const [status, msg] = e.message.split('-');
			throw new HttpException(
				`${msg ?? 'Erro ao realizar consulta.'}`,
				Number(status) || 500
			);
		}
	}

	async findAll(): Promise<RoleEntity[]> {
		try {
			return await this.findAllRolesUseCase.execute();
		} catch (e) {
			const [status, msg] = e.message.split('-');
			throw new HttpException(
				`${msg ?? 'Erro ao realizar consulta.'}`,
				Number(status) || 500
			);
		}
	}
}
