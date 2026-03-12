import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	UseGuards,
	Request,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiBody,
	ApiOperation,
	ApiParam,
	ApiQuery,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/in/create-user.dto';
import { UpdateUserDto } from '../dto/in/update-user.dto';
import { LocalAuthGuard } from 'src/_shared/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/_shared/auth/jwt-auth.guard';
import { AdminRoleGuard } from 'src/_shared/auth/admin-role.guard';
import { SetRoleDto } from '../dto/in/set-role.dto';
import { ChangePasswordDto } from '../dto/in/change-password.dto';
import { RecoveyPasswordDto } from '../dto/in/recovery-password.dto';
import { CreateAdminUserDto } from '../dto/in/create-admin-user.dto';
import { PaginationDto } from 'src/_shared/protocols/dto/pagination.dto';
import { LoginDTO } from '../dto/in/login.dto';
import { LoginPersonResponseDto } from '../dto/out/login-response.dto';
import { FindAllUsersResponseDto } from '../dto/out/findAllUsers-response.dto';

import { UserEntity } from 'src/infra/database/entities/user.entity';

@ApiTags('Users')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@UseGuards(LocalAuthGuard)
	@Post('/login')
	@ApiOperation({ summary: 'Autentica um usuario' })
	@ApiBody({ type: LoginDTO })
	@ApiResponse({
		status: 201,
		description: 'Usuario autenticado com sucesso',
		type: LoginPersonResponseDto,
	})
	@ApiResponse({ status: 401, description: 'Credenciais invalidas' })
	async login(@Request() req: any) {
		return await this.userService.login(req.user);
	}

	@Post()
	@ApiOperation({ summary: 'Cria um novo usuario' })
	@ApiResponse({
		status: 201,
		description: 'Usuario criado com sucesso',
		type: UserEntity,
	})
	@ApiResponse({ status: 400, description: 'Dados invalidos' })
	async create(@Body() createUserDto: CreateUserDto) {
		return await this.userService.create(createUserDto);
	}

	@UseGuards(JwtAuthGuard, AdminRoleGuard)
	@Post('/createAdm')
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Cria um novo usuario administrador' })
	@ApiResponse({
		status: 201,
		description: 'Administrador criado com sucesso',
		type: UserEntity,
	})
	@ApiResponse({ status: 401, description: 'Nao autorizado' })
	@ApiResponse({ status: 403, description: 'Acesso restrito a administradores' })
	async createAdm(@Body() createAdminUserDto: CreateAdminUserDto) {
		return await this.userService.createAdm(createAdminUserDto);
	}

	@Post('recovery-password')
	@ApiOperation({ summary: 'Redefine a senha com token de recuperacao' })
	@ApiResponse({
		status: 201,
		description: 'Senha redefinida com sucesso',
		schema: { type: 'boolean', example: true },
	})
	@ApiResponse({ status: 401, description: 'Token invalido ou expirado' })
	async recoveryPassword(@Body() recoveryPasswordDto: RecoveyPasswordDto) {
		return await this.userService.recoveryPassword(recoveryPasswordDto);
	}

	@Post('forgot-password')
	@ApiOperation({ summary: 'Solicita envio de token para recuperar senha' })
	@ApiBody({
		schema: {
			type: 'string',
			example: 'vinicius@email.com',
			description: 'E-mail do usuario',
		},
	})
	@ApiResponse({
		status: 201,
		description: 'Solicitacao processada com sucesso',
		schema: { type: 'boolean', example: true },
	})
	@ApiResponse({ status: 400, description: 'Usuario nao encontrado' })
	async forgotPassword(@Body() email: string) {
		return await this.userService.forgotPassword(email);
	}

	@UseGuards(JwtAuthGuard, AdminRoleGuard)
	@Post('/set-role')
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Define a role ativa no token do usuario autenticado' })
	@ApiResponse({
		status: 201,
		description: 'Role definida com sucesso',
		type: LoginPersonResponseDto,
	})
	@ApiResponse({ status: 401, description: 'Nao autorizado' })
	async setRole(@Request() req: any, @Body() setRoleDto: SetRoleDto) {
		return await this.userService.setRole(req.user, setRoleDto.role);
	}

	@UseGuards(JwtAuthGuard)
	@Patch('/change-password')
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Altera a senha do usuario autenticado' })
	@ApiResponse({
		status: 200,
		description: 'Senha alterada com sucesso',
		schema: { type: 'boolean', example: true },
	})
	@ApiResponse({ status: 400, description: 'Senha atual incorreta' })
	@ApiResponse({ status: 401, description: 'Nao autorizado' })
	async changePassword(
		@Request() req: any,
		@Body() changePasswordDto: ChangePasswordDto
	) {
		return await this.userService.changePassword(
			req.user,
			changePasswordDto
		);
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Lista usuarios com paginacao' })
	@ApiQuery({ name: 'pageNumber', required: false, type: Number, example: 1 })
	@ApiQuery({ name: 'pageSize', required: false, type: Number, example: 10 })
	@ApiQuery({ name: 'orderBy', required: false, type: String, example: 'id' })
	@ApiQuery({
		name: 'orderDirection',
		required: false,
		type: String,
		example: 'ASC',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuarios listados com sucesso',
		type: FindAllUsersResponseDto,
	})
	@ApiResponse({ status: 401, description: 'Nao autorizado' })
	async findAll(@Query() paginationDto: PaginationDto) {
		return await this.userService.findAll(paginationDto);
	}

	@UseGuards(JwtAuthGuard)
	@Get(':documentNumber')
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Busca um usuario pelo numero do documento' })
	@ApiParam({
		name: 'documentNumber',
		type: String,
		description: 'Numero do documento do usuario',
		example: '12345678901',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario encontrado com sucesso',
		type: UserEntity,
	})
	@ApiResponse({ status: 401, description: 'Nao autorizado' })
	@ApiResponse({ status: 404, description: 'Usuario nao encontrado' })
	async findOneUserByDocumentNumber(
		@Param('documentNumber') documentNumber: string
	) {
		return await this.userService.findOneUserByDocumentNumber(documentNumber);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':documentNumber')
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Atualiza um usuario pelo numero do documento' })
	@ApiParam({
		name: 'documentNumber',
		type: String,
		description: 'Numero do documento do usuario',
		example: '12345678901',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario atualizado com sucesso',
		type: UserEntity,
	})
	@ApiResponse({ status: 401, description: 'Nao autorizado' })
	@ApiResponse({ status: 404, description: 'Usuario nao encontrado' })
	async update(
		@Param('documentNumber') documentNumber: string,
		@Body() updateUserDto: UpdateUserDto
	) {
		return await this.userService.update(documentNumber, updateUserDto);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':documentNumber')
	@ApiBearerAuth('bearer')
	@ApiOperation({ summary: 'Remove um usuario pelo numero do documento' })
	@ApiParam({
		name: 'documentNumber',
		type: String,
		description: 'Numero do documento do usuario',
		example: '12345678901',
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario removido com sucesso',
		type: UserEntity,
	})
	@ApiResponse({ status: 401, description: 'Nao autorizado' })
	@ApiResponse({ status: 404, description: 'Usuario nao encontrado' })
	async remove(@Param('documentNumber') documentNumber: string) {
		return await this.userService.remove(documentNumber);
	}

	@Get('/:id/validate')
	@ApiOperation({ summary: 'Valida o e-mail do usuario' })
	@ApiParam({
		name: 'id',
		type: Number,
		description: 'Identificador do usuario',
		example: 1,
	})
	@ApiResponse({
		status: 200,
		description: 'Usuario validado com sucesso',
		schema: { type: 'string', example: 'Email validado com sucesso!' },
	})
	@ApiResponse({ status: 400, description: 'Usuario nao localizado ou ja ativo' })
	async validateUser(@Param('id') id: number) {
		return await this.userService.validate(id);
	}
}
