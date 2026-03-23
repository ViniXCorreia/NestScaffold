import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/infra/database/entities/user.entity';
import {
	CREATE_USER_USE_CASE as CREATE_USER_USE_CASE,
	ICreateUserUseCase,
} from '../../useCase/createUser/createUser.interface';
import {
	DELETE_USER_USE_CASE as DELETE_USER_USE_CASE,
	IDeleteUserByDocumentNumberUseCase,
} from '../../useCase/deleteUser/deleteUser.interface';
import {
	FIND_ALL_USERS_USE_CASE as FIND_ALL_USERS_USE_CASE,
	IFindAllUsersUseCase,
} from '../../useCase/findAllUsers/findAllUsers.interface';
import {
	FIND_ONE_USER_BY_DOCUMENT_NUMBER as FIND_ONE_USER_BY_DOCUMENT_NUMBER,
	IFindOneUserByDocumentNumberUseCase,
} from '../../useCase/findOneUserByDocumentNumber/findOneUserByDocumentNumber.interface';
import {
	FIND_USER_BY_EMAIL_USE_CASE as FIND_USER_BY_EMAIL_USE_CASE,
	IFindOneUserByEmailUseCase,
} from '../../useCase/findOneUserByEmail/findOneUserByEmail.interface';
import {
	ILoginUseCase,
	LOGIN_USECASE,
} from '../../useCase/login/login.interface';
import {
	IUpdateUserUseCase,
	UPDATE_USER_USE_CASE as UPDATE_USER_USE_CASE,
} from '../../useCase/updateUser/updateUser.interface';
import { CreateUserDto } from '../dto/in/create-user.dto';
import { CreateAdminUserDto } from '../dto/in/create-admin-user.dto';
import { UpdateUserDto } from '../dto/in/update-user.dto';
import {
	ISetRoleUseCase,
	SET_ROLE_USE_CASE,
} from '../../useCase/setRoleToken/setRoleToken.interface';
import {
	CHANGE_PASSWORD_USECASE,
	IChangePasswordUseCase,
} from '../../useCase/changePassword/change-password.interface';
import {
	IValidateUserUseCase,
	VALIDATE_USER_USECASE as VALIDATE_USER_USECASE,
} from '../../useCase/validateUser/validate-user.interface';
import {
	FORGOT_PASSWORD_USECASE,
	IForgotPasswordUsecase,
} from '../../useCase/forgotPassword/forgot-password.interface';
import { RecoveyPasswordDto } from '../dto/in/recovery-password.dto';
import {
	IRecoveryPasswordUseCase,
	RECOVERY_PASSWORD_USECASE,
} from '../../useCase/recoveryPassoword/recovery-password.interface';
import { ChangePasswordDto } from '../dto/in/change-password.dto';
import {
	CREATE_ADMIN_USER_USE_CASE,
	ICreateAdminUserUseCase,
} from '../../useCase/createAdminUser/createAdminUser.interface';
import { PaginationDto } from 'src/_shared/protocols/dto/pagination.dto';

@Injectable()
export class UserService {
	constructor(
		@Inject(LOGIN_USECASE)
		private readonly loginUseCase: ILoginUseCase,
		@Inject(CREATE_USER_USE_CASE)
		private readonly createPersonUseCase: ICreateUserUseCase,
		@Inject(CREATE_ADMIN_USER_USE_CASE)
		private readonly createAdminUserUseCase: ICreateAdminUserUseCase,
		@Inject(FIND_USER_BY_EMAIL_USE_CASE)
		private readonly findOnePersonByEmalUseCase: IFindOneUserByEmailUseCase,
		@Inject(FIND_ONE_USER_BY_DOCUMENT_NUMBER)
		private readonly findOnePersoByDocumentNumberUseCase: IFindOneUserByDocumentNumberUseCase,
		@Inject(DELETE_USER_USE_CASE)
		private readonly deletePersonByDocumentNumberUseCase: IDeleteUserByDocumentNumberUseCase,
		@Inject(FIND_ALL_USERS_USE_CASE)
		private readonly findAllUsersUseCase: IFindAllUsersUseCase,
		@Inject(UPDATE_USER_USE_CASE)
		private readonly updateUserUseCase: IUpdateUserUseCase,
		@Inject(SET_ROLE_USE_CASE)
		private readonly setRoleUseCase: ISetRoleUseCase,
		@Inject(CHANGE_PASSWORD_USECASE)
		private readonly changePasswordUseCase: IChangePasswordUseCase,
		@Inject(VALIDATE_USER_USECASE)
		private readonly validateUserUseCase: IValidateUserUseCase,
		@Inject(FORGOT_PASSWORD_USECASE)
		private readonly forgotPasswordUseCase: IForgotPasswordUsecase,
		@Inject(RECOVERY_PASSWORD_USECASE)
		private readonly recoveryPasswordUseCase: IRecoveryPasswordUseCase
	) { }
	async login(loginUser: UserEntity) {
		try {
			return await this.loginUseCase.execute(loginUser);
		} catch (e) {
			let [status, msg] = e.message.split('-');
			throw new HttpException(
				`${msg ?? 'Erro ao realizar consulta.'}`,
				+status
			);
		}
	}

	async forgotPassword(email: string) {
		try {
			return await this.forgotPasswordUseCase.execute(email);
		} catch (e) {
			let [status, msg] = e.message.split('-');
			throw new HttpException(
				`${msg ?? 'Erro ao realizar consulta.'}`,
				+status
			);
		}
	}

	async recoveryPassword(recoveryPassword: RecoveyPasswordDto) {
		try {
			return await this.recoveryPasswordUseCase.execute({
				recoveryPassword,
			});
		} catch (e) {
			let [status, msg] = e.message.split('-');
			throw new HttpException(
				`${msg ?? 'Erro ao realizar consulta.'}`,
				+status
			);
		}
	}

	async setRole(loginUser: UserEntity, role: string) {
		try {
			return await this.setRoleUseCase.execute({ loginUser, role });
		} catch (e) {
			let [status, msg] = e.message.split('-');
			throw new HttpException(
				`${msg ?? 'Erro ao realizar consulta.'}`,
				+status
			);
		}
	}

	async create(createUserDto: CreateUserDto) {
		return await this.createPersonUseCase.execute(createUserDto);
	}

	async createAdm(createAdminUserDto: CreateAdminUserDto) {
		try {
			return await this.createAdminUserUseCase.execute(createAdminUserDto);
		} catch (e) {
			let [status, msg] = e.message.split('-');
			throw new HttpException(
				`${msg ?? 'Erro ao realizar consulta.'}`,
				+status || e.status
			);
		}
	}

	async changePassword(
		reqUser: any,
		changePasswordDto: ChangePasswordDto
	) {
		try {
			return await this.changePasswordUseCase.execute(
				reqUser,
				changePasswordDto
			);
		} catch (e) {
			let [status, msg] = e.message.split('-');
			throw new HttpException(
				`${msg ?? 'Erro ao realizar consulta.'}`,
				+status
			);
		}
	}

	async findAll(paginationDto: PaginationDto) {
		return await this.findAllUsersUseCase.execute(paginationDto);
	}

	async findOneUserByEmail(email: string) {
		return await this.findOnePersonByEmalUseCase.execute(email);
	}

	async findOneUserByDocumentNumber(documentNumber: string) {
		return await this.findOnePersoByDocumentNumberUseCase.execute(documentNumber);
	}

	async update(documentNumber: string, updateUserDto: UpdateUserDto, reqUser: any) {
		return await this.updateUserUseCase.execute(documentNumber, updateUserDto, reqUser);
	}

	async remove(documentNumber: string) {
		return await this.deletePersonByDocumentNumberUseCase.execute(documentNumber);
	}

	async validate(id: number) {
		try {
			return await this.validateUserUseCase.execute(id);
		} catch (e) {
			let [status, msg] = e.message.split('-');
			throw new HttpException(
				`${msg ?? 'Erro ao realizar consulta.'}`,
				+status
			);
		}
	}
}
