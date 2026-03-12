import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsString } from 'class-validator';

export class SetRoleDto {
	@ApiProperty({
		example: 'ADMIN',
		enum: ['COMPANY', 'CUSTOMER', 'COLLABORATOR', 'ADMIN'],
		description: 'Role que sera adicionada ao token do usuario',
	})
	@IsString()
	role: string;
}
