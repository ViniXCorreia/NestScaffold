import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/infra/database/entities/user.entity';

export class FindAllUsersResponseDto {
	@ApiProperty({ type: () => [UserEntity], description: 'Usuarios retornados' })
	items: UserEntity[];

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
