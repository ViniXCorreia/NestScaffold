import { RoleEntity } from 'src/infra/database/entities/role.entity';

export const FIND_ALL_ROLES_USE_CASE = 'FindAllRolesUseCase';

export interface IFindAllRolesUseCase {
	execute(): Promise<RoleEntity[]>;
}
