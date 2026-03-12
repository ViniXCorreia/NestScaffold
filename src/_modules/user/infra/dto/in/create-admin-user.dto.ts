import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class CreateAdminUserDto extends OmitType(CreateUserDto, [
	'roleId',
] as const) {
	@ApiPropertyOptional({
		example: true,
		description: 'Flag opcional para usuarios administrativos ja validados',
	})
	validate?: boolean;
}
