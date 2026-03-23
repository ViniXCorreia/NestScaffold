import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsBoolean,
	IsEmail,
	IsInt,
	IsOptional,
	IsString,
	MinLength,
	ValidateNested,
} from 'class-validator';
import { AddressDto } from './address.dto';

export class CreateUserDto {
	@ApiProperty({ example: 'Nome', description: 'Nome do usuario' })
	@IsString()
	name: string;

	@ApiProperty({ example: 'do Usuario', description: 'Sobrenome do usuario' })
	@IsString()
	lastName: string;

	@ApiProperty({ example: 'Senha@123', description: 'Senha do usuario' })
	@IsString()
	@MinLength(6)
	password: string;

	@ApiProperty({ example: 'PF', description: 'Tipo de pessoa' })
	@IsString()
	personType: string;

	@ApiProperty({
		example: 'user@email.com',
		description: 'E-mail do usuario',
	})
	@IsEmail()
	email: string;

	@ApiProperty({
		example: '12345678901',
		description: 'Documento do usuario',
	})
	@IsString()
	documentNumber: string;

	@ApiProperty({
		example: '11999999999',
		description: 'Celular do usuario',
	})
	@IsString()
	cellphone: string;

	@ApiProperty({ example: 1, description: 'Identificador da role principal' })
	@IsInt()
	roleId: number;

	@ApiPropertyOptional({
		example: false,
		description: 'Indica se o usuario ja foi validado',
		default: false,
	})
	@IsOptional()
	@IsBoolean()
	validate?: boolean = false;

	@ApiProperty({ type: () => AddressDto, description: 'Endereco do usuario' })
	@ValidateNested()
	@Type(() => AddressDto)
	address: AddressDto;
}
