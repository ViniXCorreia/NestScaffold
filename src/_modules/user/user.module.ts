import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './infra/controller/user.service';
import { UserController } from './infra/controller/user.controller';
import { LOGIN_USECASE } from './useCase/login/login.interface';
import { LoginUseCase } from './useCase/login/login.usecase';
import { FIND_ONE_USER_BY_DOCUMENT_NUMBER } from './useCase/findOneUserByDocumentNumber/findOneUserByDocumentNumber.interface';
import { FindOneUserByDocumentNumberUseCase } from './useCase/findOneUserByDocumentNumber/findOneUserByDocumentNumber.usecase';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { AuthModule } from 'src/_shared/auth/auth.module';
import { CREATE_USER_USE_CASE } from './useCase/createUser/createUser.interface';
import { CreateUserUseCase } from './useCase/createUser/createUser.usecase';
import { DELETE_USER_USE_CASE } from './useCase/deleteUser/deleteUser.interface';
import { DeleteUserByDocumentNumberUseCase } from './useCase/deleteUser/deleteUser.usecase';
import { FIND_ALL_USERS_USE_CASE } from './useCase/findAllUsers/findAllUsers.interface';
import { FindAllUsersUseCase } from './useCase/findAllUsers/findAllUsers.usecase';
import { UPDATE_USER_USE_CASE } from './useCase/updateUser/updateUser.interface';
import { UpdateUserUseCase } from './useCase/updateUser/updateUser.usecase';
import { FIND_USER_BY_EMAIL_USE_CASE } from './useCase/findOneUserByEmail/findOneUserByEmail.interface';
import { FindOneUserByEmailUseCase } from './useCase/findOneUserByEmail/findOneUserByEmail.usecase';
import { SET_ROLE_USE_CASE } from './useCase/setRoleToken/setRoleToken.interface';
import { SetRoleUseCase } from './useCase/setRoleToken/setRoleToken.usecase';
import { CryptoModule } from 'src/_shared/crypto/crypto.module';
import { CHANGE_PASSWORD_USECASE } from './useCase/changePassword/change-password.interface';
import { ChangePasswordUseCase } from './useCase/changePassword/change-password.usecase';
import { MailModule } from 'src/_shared/mailModule/mail.module';
import { VALIDATE_USER_USECASE } from './useCase/validateUser/validate-user.interface';
import { ValidateUserUseCase } from './useCase/validateUser/validate-user.usecase';
import { FORGOT_PASSWORD_USECASE } from './useCase/forgotPassword/forgot-password.interface';
import { ForgotPasswordUsecase } from './useCase/forgotPassword/forgot-password.usecase';
import { RECOVERY_PASSWORD_USECASE } from './useCase/recoveryPassoword/recovery-password.interface';
import { RecoveryPasswordUseCase } from './useCase/recoveryPassoword/recovery-password.usecase';
import { AdminRoleGuard } from 'src/_shared/auth/admin-role.guard';
import { CREATE_ADMIN_USER_USE_CASE } from './useCase/createAdminUser/createAdminUser.interface';
import { CreateAdminUserUseCase } from './useCase/createAdminUser/createAdminUser.usecase';
import { RoleModule } from '../roles/role.module';

@Module({
	imports: [
		RepositoryProxyModule.register(),
		forwardRef(() => AuthModule),
		CryptoModule,
		MailModule,
	],
	controllers: [UserController],
	providers: [
		UserService,
		AdminRoleGuard,
		{
			provide: LOGIN_USECASE,
			useClass: LoginUseCase,
		},
		{
			provide: FIND_ONE_USER_BY_DOCUMENT_NUMBER,
			useClass: FindOneUserByDocumentNumberUseCase,
		},
		{
			provide: FIND_ALL_USERS_USE_CASE,
			useClass: FindAllUsersUseCase,
		},
		{
			provide: CREATE_USER_USE_CASE,
			useClass: CreateUserUseCase,
		},
		{
			provide: CREATE_ADMIN_USER_USE_CASE,
			useClass: CreateAdminUserUseCase,
		},
		{
			provide: DELETE_USER_USE_CASE,
			useClass: DeleteUserByDocumentNumberUseCase,
		},
		{
			provide: UPDATE_USER_USE_CASE,
			useClass: UpdateUserUseCase,
		},
		{
			provide: FIND_USER_BY_EMAIL_USE_CASE,
			useClass: FindOneUserByEmailUseCase,
		},
		{
			provide: SET_ROLE_USE_CASE,
			useClass: SetRoleUseCase,
		},
		{
			provide: CHANGE_PASSWORD_USECASE,
			useClass: ChangePasswordUseCase,
		},
		{
			provide: VALIDATE_USER_USECASE,
			useClass: ValidateUserUseCase,
		},
		{
			provide: FORGOT_PASSWORD_USECASE,
			useClass: ForgotPasswordUsecase,
		},
		{
			provide: RECOVERY_PASSWORD_USECASE,
			useClass: RecoveryPasswordUseCase,
		},
	],
	exports: [UserService],
})
export class UserModule {}
