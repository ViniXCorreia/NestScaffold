import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDTO {
	@ApiProperty({
		example: 'usuario@email.com.br',
		description: 'Email utilizado no login',
	})
	@IsString()
	email: string;

	@ApiProperty({ example: 'Senha@123', description: 'Senha do usuario' })
	@IsString()
	password: string;
}
