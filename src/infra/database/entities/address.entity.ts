import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'address' })
export class AddressEntity {
	@ApiProperty({ example: 1, description: 'Identificador do endereco' })
	@PrimaryGeneratedColumn()
	id: number;

	@ApiProperty({ example: '01001-000', description: 'CEP do endereco' })
	@Column()
	zipCode: string;

	@ApiProperty({ example: 'SP', description: 'UF do endereco' })
	@Column()
	federalState: string;

	@ApiProperty({ example: 'Sao Paulo', description: 'Cidade do endereco' })
	@Column()
	city: string;

	@ApiProperty({ example: 'Rua das Flores', description: 'Logradouro' })
	@Column()
	street: string;

	@ApiProperty({ example: 'Centro', description: 'Bairro' })
	@Column()
	district: string;

	@ApiProperty({ example: 123, description: 'Numero do endereco' })
	@Column()
	number: number;

	@ApiPropertyOptional({ example: 'Apto 45', description: 'Complemento' })
	@Column({ nullable: true })
	complement?: string;

	@CreateDateColumn()
	createdAt?: Date;

	@UpdateDateColumn()
	updatedAt?: Date;
}
