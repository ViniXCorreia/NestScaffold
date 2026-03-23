import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user-response.dto';

export class FindAllUsersResponseDto {
	@ApiProperty({ type: () => [UserResponseDto], description: 'Usuarios retornados' })
	items: UserResponseDto[];

	@ApiProperty({ example: 1, description: 'Pagina atual' })
	pageNumber: number;

	@ApiProperty({ example: 10, description: 'Tamanho da pagina' })
	pageSize: number;

	@ApiProperty({ example: 25, description: 'Total de itens encontrados' })
	totalItems: number;

	@ApiProperty({ example: 3, description: 'Total de paginas disponiveis' })
	totalPages: number;
}

export interface IFindAllUsersResponseDTO extends FindAllUsersResponseDto {}
