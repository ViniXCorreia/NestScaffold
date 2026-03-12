import { Module } from '@nestjs/common';
import { AdminRoleGuard } from 'src/_shared/auth/admin-role.guard';
import { RepositoryProxyModule } from 'src/infra/database/proxy/repository.proxy.module';
import { RoleController } from './infra/controller/role.controller';
import { RoleService } from './infra/controller/role.service';
import { CreateRoleUseCase } from './useCase/createRole/createRole.usecase';
import { CREATE_ROLE_USE_CASE } from './useCase/createRole/createRole.interface';
import { DeleteRoleUseCase } from './useCase/deleteRole/deleteRole.usecase';
import { DELETE_ROLE_USE_CASE } from './useCase/deleteRole/deleteRole.interface';
import { FindAllRolesUseCase } from './useCase/findAllRoles/findAllRoles.usecase';
import { FIND_ALL_ROLES_USE_CASE } from './useCase/findAllRoles/findAllRoles.interface';
import { FindRoleByIdUseCase } from './useCase/findRoleById/findRoleById.usecase';
import { FIND_ROLE_BY_ID_USE_CASE } from './useCase/findRoleById/findRoleById.interface';
import { UpdateRoleUseCase } from './useCase/updateRole/updateRole.usecase';
import { UPDATE_ROLE_USE_CASE } from './useCase/updateRole/updateRole.interface';

@Module({
	imports: [RepositoryProxyModule.register()],
	controllers: [RoleController],
	providers: [
		RoleService,
		AdminRoleGuard,
		{
			provide: CREATE_ROLE_USE_CASE,
			useClass: CreateRoleUseCase,
		},
		{
			provide: UPDATE_ROLE_USE_CASE,
			useClass: UpdateRoleUseCase,
		},
		{
			provide: DELETE_ROLE_USE_CASE,
			useClass: DeleteRoleUseCase,
		},
		{
			provide: FIND_ROLE_BY_ID_USE_CASE,
			useClass: FindRoleByIdUseCase,
		},
		{
			provide: FIND_ALL_ROLES_USE_CASE,
			useClass: FindAllRolesUseCase,
		},
	],
	exports:[RoleService]
})
export class RoleModule {}
