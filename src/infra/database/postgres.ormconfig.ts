import { DataSource } from 'typeorm';
require('dotenv').config({ path: '.env' });

export const postgres = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: +process.env.DB_PORT,
	username: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
	entities: ['dist/infra/database/entities/*.entity.{ts,js}'],
	migrationsTableName: 'migration_table',
	migrations: ['dist/infra/database/migration/**/*.js'],
	logging: process.env.DB_LOG === 'true',
	synchronize: false,
	ssl: false,
});
