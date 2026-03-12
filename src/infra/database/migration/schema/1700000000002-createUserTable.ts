import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserTable1700000000002 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "user" (
				"id" SERIAL PRIMARY KEY,
				"name" character varying NOT NULL,
				"lastName" character varying,
				"password" character varying NOT NULL,
				"personType" character varying NOT NULL,
				"email" character varying NOT NULL UNIQUE,
				"documentNumber" character varying NOT NULL,
				"cellphone" character varying NOT NULL,
				"validate" boolean NOT NULL DEFAULT false,
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
				"addressId" integer UNIQUE,
				CONSTRAINT "FK_user_address" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
			)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS "user"`);
	}
}
