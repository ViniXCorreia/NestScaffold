import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
	@ApiProperty({
		example: 'vinicius@email.com',
		description: 'E-mail do usuario',
	})
	@IsEmail()
	email: string;
}
