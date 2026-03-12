import {
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'userRoles' })
export class UserRoleEntity {
	@PrimaryColumn({ name: 'userId', type: 'int' })
	userId: number;

	@PrimaryColumn({ name: 'roleId', type: 'int' })
	roleId: number;

	@ManyToOne(() => UserEntity, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
	@JoinColumn({ name: 'userId' })
	user?: UserEntity;

	@ManyToOne(() => RoleEntity, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
	@JoinColumn({ name: 'roleId' })
	role?: RoleEntity;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;
}
