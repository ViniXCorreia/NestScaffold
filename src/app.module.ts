import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './infra/database/database.module';
import { RepositoryProxyModule } from './infra/database/proxy/repository.proxy.module';
import { UserController } from './_modules/user/infra/controller/user.controller';
import { RoleModule } from './_modules/roles/role.module';
import { UserModule } from './_modules/user/user.module';
import { AuthModule } from './_shared/auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: './.env' }),
		DatabaseModule,
		RepositoryProxyModule,
		AuthModule,
		RoleModule,
		UserModule,
		ScheduleModule.forRoot(),
	],
	controllers: [
		UserController,
	],
})
export class AppModule {}
