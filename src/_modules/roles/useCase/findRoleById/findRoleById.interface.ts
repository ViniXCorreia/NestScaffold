import { RoleEntity } from 'src/infra/database/entities/role.entity';

export const FIND_ROLE_BY_ID_USE_CASE = 'FindRoleByIdUseCase';

export interface IFindRoleByIdUseCase {
	execute(id: number): Promise<RoleEntity>;
}
