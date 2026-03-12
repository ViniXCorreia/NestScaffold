import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class AddressDto {

	@ApiProperty({ example: '01001-000', description: 'CEP do endereco' })
	@IsString()
	zipCode: string;

	@ApiProperty({ example: 'SP', description: 'UF do endereco' })
	@IsString()
	federalState: string;

	@ApiProperty({ example: 'Sao Paulo', description: 'Cidade do endereco' })
	@IsString()
	city: string;

	@ApiProperty({ example: 'Rua das Flores', description: 'Logradouro' })
	@IsString()
	street: string;

	@ApiProperty({ example: 'Centro', description: 'Bairro do endereco' })
	@IsString()
	district: string;

	@ApiProperty({ example: 123, description: 'Numero do endereco' })
	@IsInt()
	number: number;

	@ApiPropertyOptional({
		example: 'Apto 45',
		description: 'Complemento do endereco',
	})
	@IsOptional()
	@IsString()
	complement?: string;
}
