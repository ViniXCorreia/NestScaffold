import { RoleEntity } from 'src/infra/database/entities/role.entity';
import { CreateRoleDto } from '../../infra/dto/in/create-role.dto';

export const CREATE_ROLE_USE_CASE = 'CreateRoleUseCase';

export interface ICreateRoleUseCase {
	execute(createRoleDto: CreateRoleDto): Promise<RoleEntity>;
}
