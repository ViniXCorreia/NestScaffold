import { MigrationInterface, QueryRunner } from 'typeorm';
import { RoleEntity } from '../../entities/role.entity';

export class insertAdminRole1700000000005 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.save(
            queryRunner.manager.create<RoleEntity>(RoleEntity, {
                description: "ADMIN"
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
			DELETE FROM "roles" WHERE "description" = 'ADMIN'
		`);
    }
}
