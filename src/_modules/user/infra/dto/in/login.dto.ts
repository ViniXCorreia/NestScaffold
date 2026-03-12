import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDTO {
	@ApiProperty({
		example: '12345678901',
		description: 'Documento utilizado no login',
	})
	@IsString()
	username: string;

	@ApiProperty({ example: 'Senha@123', description: 'Senha do usuario' })
	@IsString()
	password: string;
}
