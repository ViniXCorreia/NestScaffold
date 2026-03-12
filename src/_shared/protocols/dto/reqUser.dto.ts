import { ApiProperty } from '@nestjs/swagger';

export class ReqUserDto {
	@ApiProperty({ example: 1, description: 'Identificador do usuario autenticado' })
	user: number;

	@ApiProperty({ example: 'ADMIN', description: 'Role presente no token' })
	role: string;

	@ApiProperty({ example: 1710000000, description: 'Issued at do JWT' })
	iat: number;

	@ApiProperty({ example: 1710003600, description: 'Expiracao do JWT' })
	exp: number;
}
