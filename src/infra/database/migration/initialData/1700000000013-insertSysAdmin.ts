import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { RoleEntity } from '../../entities/role.entity';

export class insertSysAdmin1700000000013 implements MigrationInterface {

	public async up(queryRunner: QueryRunner): Promise<void> {

		const roleRepo = queryRunner.manager.getRepository(RoleEntity);
		const userRepo = queryRunner.manager.getRepository(UserEntity);

		const adminRole = await roleRepo.findOne({
			where: { description: 'ADMIN' }
		});

		const user = userRepo.create({
			name: 'Admin',
			lastName: '',
			password: 'c8818a60aad022fbc640694f46cf8ea2be8eb737871a59475398ffcae1cafccd', // 123456 com a criptografia hmac SHA-256 chave 'scaffold-crypto-key'
			personType: 'PF',
			email: 'admin@scaffold.com',
			documentNumber: '14980700004',
			cellphone: '48999451094',
			validate: true,
			address: {
				zipCode: '88888888',
				federalState: 'XX',
				city: 'XXXXXXX',
				street: 'XX',
				district: 'XX',
				number: 0
			},
			roles: adminRole ? [adminRole] : []
		});

		await userRepo.save(user);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.manager.delete(UserEntity, {
			email: 'admin@scaffold.com'
		});
	}
}
