import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { AddressEntity } from './address.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'user' })
export class UserEntity {
	@ApiProperty({ example: 1, description: 'Identificador do usuario' })
	@PrimaryGeneratedColumn()
	id?: number;

	@ApiProperty({ example: 'Nome', description: 'Nome do usuario' })
	@Column()
	name: string;

	@ApiPropertyOptional({ example: 'do Usuario', description: 'Sobrenome do usuario' })
	@Column({ nullable: true })
	lastName?: string;

	@ApiProperty({ example: 'hash-da-senha', description: 'Senha armazenada' })
	@Column()
	password: string;

	@ApiProperty({ example: 'PF', description: 'Tipo de pessoa' })
	@Column()
	personType: string;

	@ApiProperty({
		example: 'user@email.com',
		description: 'E-mail do usuario',
	})
	@Column({ unique: true })
	email: string;

	@ApiProperty({
		example: '12345678901',
		description: 'Documento do usuario',
	})
	@Column()
	documentNumber: string;

	@ApiProperty({
		example: '11999999999',
		description: 'Celular do usuario',
	})
	@Column()
	cellphone: string;

	@ApiProperty({ example: false, description: 'Indica se o e-mail foi validado' })
	@Column({ default: false })
	validate?: boolean;

	@ApiPropertyOptional({
		example: '2026-03-10T00:00:00.000Z',
		description: 'Data de criacao',
	})
	@Column()
	@CreateDateColumn()
	createdAt?: Date;

	@ApiPropertyOptional({
		example: '2026-03-10T00:00:00.000Z',
		description: 'Data de atualizacao',
	})
	@Column()
	@UpdateDateColumn()
	updatedAt?: Date;

	@ApiPropertyOptional({ type: () => AddressEntity, description: 'Endereco do usuario' })
	@OneToOne(() => AddressEntity, { eager: true, cascade: true })
	@JoinColumn({ name: 'addressId' })
	address?: AddressEntity;

	@ApiPropertyOptional({ type: () => [RoleEntity], description: 'Roles do usuario' })
	@ManyToMany(() => RoleEntity, (role) => role.users)
	@JoinTable({
		name: 'userRoles',
		joinColumn: {
			name: 'userId',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'roleId',
			referencedColumnName: 'id',
		},
	})
	roles?: RoleEntity[];
}
