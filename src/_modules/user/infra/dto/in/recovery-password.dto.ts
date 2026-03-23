import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class RecoveyPasswordDto {
	@ApiProperty({
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
		description: 'Token de recuperacao de senha',
	})
	@IsString()
	token: string;

	@ApiProperty({ example: 'NovaSenha@123', description: 'Nova senha desejada' })
	@IsString()
	@MinLength(6)
	newPassword: string;
}
