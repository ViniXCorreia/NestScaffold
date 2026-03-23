import { ApiProperty } from '@nestjs/swagger';

export class ActionMessageDto {
	@ApiProperty({
		example: 'Usuario criado com sucesso',
		description: 'Mensagem de sucesso da operacao',
	})
	message: string;
}
