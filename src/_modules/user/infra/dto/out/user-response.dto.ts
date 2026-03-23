import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AddressEntity } from 'src/infra/database/entities/address.entity';
import { RoleEntity } from 'src/infra/database/entities/role.entity';
import { UserEntity } from 'src/infra/database/entities/user.entity';

export class UserResponseDto {
	@ApiProperty({ example: 1, description: 'Identificador do usuario' })
	id?: number;

	@ApiProperty({ example: 'Nome', description: 'Nome do usuario' })
	name: string;

	@ApiPropertyOptional({
		example: 'do Usuario',
		description: 'Sobrenome do usuario',
	})
	lastName?: string;

	@ApiProperty({ example: 'PF', description: 'Tipo de pessoa' })
	personType: string;

	@ApiProperty({
		example: 'user@email.com',
		description: 'E-mail do usuario',
	})
	email: string;

	@ApiProperty({
		example: '12345678901',
		description: 'Documento do usuario',
	})
	documentNumber: string;

	@ApiProperty({
		example: '11999999999',
		description: 'Celular do usuario',
	})
	cellphone: string;

	@ApiProperty({ example: false, description: 'Indica se o e-mail foi validado' })
	validate?: boolean;

	@ApiPropertyOptional({
		example: '2026-03-10T00:00:00.000Z',
		description: 'Data de criacao',
	})
	createdAt?: Date;

	@ApiPropertyOptional({
		example: '2026-03-10T00:00:00.000Z',
		description: 'Data de atualizacao',
	})
	updatedAt?: Date;

	@ApiPropertyOptional({
		type: () => AddressEntity,
		description: 'Endereco do usuario',
	})
	address?: AddressEntity;

	@ApiPropertyOptional({
		type: () => [RoleEntity],
		description: 'Roles do usuario',
	})
	roles?: RoleEntity[];

	static fromEntity(
		user: Omit<UserEntity, 'password'> & { password?: string }
	): UserResponseDto {
		const { password: _password, ...userWithoutPassword } = user;

		return Object.assign(new UserResponseDto(), userWithoutPassword);
	}
}
