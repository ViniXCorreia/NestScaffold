import { Module } from '@nestjs/common';
import { DynamicModule } from '@nestjs/common/interfaces';
import { DataSource } from 'typeorm';
import { DatabaseModule } from '../database.module';
import { DB_POSTGRES } from '../database.provider';
import { UserEntity } from '../entities/user.entity';
import { AddressEntity } from '../entities/address.entity';
import { RoleEntity } from '../entities/role.entity';
import { UserRoleEntity } from '../entities/userRole.entity';

@Module({
	imports: [DatabaseModule],
})
export class RepositoryProxyModule {
	static ADDRESS_REPOSITORY = 'AddressRepository';
	static USER_REPOSITORY = 'PersonRepository';
	static ROLE_REPOSITORY = 'RoleRepository';
	static USER_ROLE_REPOSITORY = 'UserRoleRepository';

	static register(): DynamicModule {
		return {
			module: RepositoryProxyModule,
			providers: [
				{
					provide: RepositoryProxyModule.ADDRESS_REPOSITORY,
					useFactory: (dataSource: DataSource) =>
						dataSource.getRepository(AddressEntity),
					inject: [DB_POSTGRES],
				},
				{
					provide: RepositoryProxyModule.USER_REPOSITORY,
					useFactory: (dataSource: DataSource) =>
						dataSource.getRepository(UserEntity),
					inject: [DB_POSTGRES],
				},
				{
					provide: RepositoryProxyModule.ROLE_REPOSITORY,
					useFactory: (dataSource: DataSource) =>
						dataSource.getRepository(RoleEntity),
					inject: [DB_POSTGRES],
				},
				{
					provide: RepositoryProxyModule.USER_ROLE_REPOSITORY,
					useFactory: (dataSource: DataSource) =>
						dataSource.getRepository(UserRoleEntity),
					inject: [DB_POSTGRES],
				},
			],
			exports: [
				RepositoryProxyModule.ADDRESS_REPOSITORY,
				RepositoryProxyModule.USER_REPOSITORY,
				RepositoryProxyModule.ROLE_REPOSITORY,
				RepositoryProxyModule.USER_ROLE_REPOSITORY,
			],
		};
	}
}
