import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
	@ApiProperty({ example: 'SenhaAtual@123', description: 'Senha atual do usuario' })
	@IsString()
	@MinLength(6)
	currentPassword: string;

	@ApiProperty({ example: 'NovaSenha@123', description: 'Nova senha do usuario' })
	@IsString()
	@MinLength(6)
	newPassword: string;
}
