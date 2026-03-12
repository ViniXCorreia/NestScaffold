import { ApiProperty } from '@nestjs/swagger';

export class LoginPersonResponseDto {
	@ApiProperty({
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
		description: 'JWT de acesso',
	})
	accessToken: string;
}
