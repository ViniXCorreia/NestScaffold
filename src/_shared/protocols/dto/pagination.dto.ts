import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
	@ApiPropertyOptional({
		example: 1,
		description: 'Numero da pagina',
		default: 1,
	})
	@Transform(({ value }) => Number(value))
	@IsOptional()
	@IsNumber()
	pageNumber?: number = 1;

	@ApiPropertyOptional({
		example: 10,
		description: 'Quantidade de itens por pagina',
		default: 10,
	})
	@Transform(({ value }) => Number(value))
	@IsOptional()
	@IsNumber()
	pageSize?: number = 10;

	@ApiPropertyOptional({
		example: 'id',
		description: 'Campo de ordenacao',
		default: 'id',
	})
	@IsOptional()
	@IsString()
	orderBy?: string = 'id';

	@ApiPropertyOptional({
		example: 'ASC',
		description: 'Direcao da ordenacao',
		default: 'ASC',
	})
	@IsOptional()
	@IsString()
	orderDirection?: string = 'ASC';
}
