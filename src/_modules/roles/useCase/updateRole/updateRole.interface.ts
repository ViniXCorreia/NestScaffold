import { RoleEntity } from 'src/infra/database/entities/role.entity';
import { UpdateRoleDto } from '../../infra/dto/in/update-role.dto';

export const UPDATE_ROLE_USE_CASE = 'UpdateRoleUseCase';

export interface IUpdateRoleUseCase {
	execute(id: number, updateRoleDto: UpdateRoleDto): Promise<RoleEntity>;
}
