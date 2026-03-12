import { RoleEntity } from 'src/infra/database/entities/role.entity';

export const DELETE_ROLE_USE_CASE = 'DeleteRoleUseCase';

export interface IDeleteRoleUseCase {
	execute(id: number): Promise<RoleEntity>;
}
