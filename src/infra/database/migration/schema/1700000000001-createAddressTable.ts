import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAddressTable1700000000001 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`
			CREATE TABLE IF NOT EXISTS "address" (
				"id" SERIAL PRIMARY KEY,
				"zipCode" character varying NOT NULL,
				"federalState" character varying NOT NULL,
				"city" character varying NOT NULL,
				"street" character varying NOT NULL,
				"district" character varying NOT NULL,
				"number" integer NOT NULL,
				"complement" character varying,
				"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
				"updatedAt" TIMESTAMP NOT NULL DEFAULT now()
			)
		`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP TABLE IF EXISTS "address"`);
	}
}
