import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	UseGuards,
} from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags,
} from '@nestjs/swagger';
import { AdminRoleGuard } from 'src/_shared/auth/admin-role.guard';
import { JwtAuthGuard } from 'src/_shared/auth/jwt-auth.guard';
import { CreateRoleDto } from '../dto/in/create-role.dto';
import { UpdateRoleDto } from '../dto/in/update-role.dto';
import { RoleService } from './role.service';
import { RoleEntity } from 'src/infra/database/entities/role.entity';

@ApiTags('Roles')
@ApiBearerAuth('bearer')
@Controller('roles')
@UseGuards(JwtAuthGuard, AdminRoleGuard)
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Post()
	@ApiOperation({ summary: 'Cria uma nova role' })
	@ApiResponse({
		status: 201,
		description: 'Role criada com sucesso',
		type: RoleEntity,
	})
	@ApiResponse({ status: 401, description: 'Nao autorizado' })
	@ApiResponse({ status: 403, description: 'Acesso restrito a administradores' })
	async create(@Body() createRoleDto: CreateRoleDto) {
		return await this.roleService.create(createRoleDto);
	}

	@Get()
	@ApiOperation({ summary: 'Lista todas as roles' })
	@ApiResponse({
		status: 200,
		description: 'Roles listadas com sucesso',
		type: RoleEntity,
		isArray: true,
	})
	@ApiResponse({ status: 401, description: 'Nao autorizado' })
	@ApiResponse({ status: 403, description: 'Acesso restrito a administradores' })
	async findAll() {
		return await this.roleService.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Busca uma role pelo identificador' })
	@ApiParam({ name: 'id', type: Number, example: 1, description: 'ID da role' })
	@ApiResponse({
		status: 200,
		description: 'Role encontrada com sucesso',
		type: RoleEntity,
	})
	@ApiResponse({ status: 401, description: 'Nao autorizado' })
	@ApiResponse({ status: 403, description: 'Acesso restrito a administradores' })
	@ApiResponse({ status: 404, description: 'Role nao encontrada' })
	async findById(@Param('id', ParseIntPipe) id: number) {
		return await this.roleService.findById(id);
	}

	@Patch(':id')
	@ApiOperation({ summary: 'Atualiza uma role pelo identificador' })
	@ApiParam({ name: 'id', type: Number, example: 1, description: 'ID da role' })
	@ApiResponse({
		status: 200,
		description: 'Role atualizada com sucesso',
		type: RoleEntity,
	})
	@ApiResponse({ status: 401, description: 'Nao autorizado' })
	@ApiResponse({ status: 403, description: 'Acesso restrito a administradores' })
	@ApiResponse({ status: 404, description: 'Role nao encontrada' })
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body() updateRoleDto: UpdateRoleDto
	) {
		return await this.roleService.update(id, updateRoleDto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Remove uma role pelo identificador' })
	@ApiParam({ name: 'id', type: Number, example: 1, description: 'ID da role' })
	@ApiResponse({
		status: 200,
		description: 'Role removida com sucesso',
		type: RoleEntity,
	})
	@ApiResponse({ status: 401, description: 'Nao autorizado' })
	@ApiResponse({ status: 403, description: 'Acesso restrito a administradores' })
	@ApiResponse({ status: 404, description: 'Role nao encontrada' })
	async remove(@Param('id', ParseIntPipe) id: number) {
		return await this.roleService.remove(id);
	}
}
