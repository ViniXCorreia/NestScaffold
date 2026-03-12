import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'roles' })
export class RoleEntity {
	@ApiProperty({ example: 1, description: 'Identificador da role' })
	@PrimaryGeneratedColumn()
	id?: number;

	@ApiProperty({ example: 'ADMIN', description: 'Descricao da role' })
	@Column()
	description: string;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;

	@ApiHideProperty()
	@ManyToMany(() => UserEntity, (user) => user.roles)
	users?: UserEntity[];
}
