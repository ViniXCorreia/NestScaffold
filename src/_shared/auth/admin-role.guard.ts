import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminRoleGuard implements CanActivate {
	private static readonly ADMIN_ROLE_ID = 1;

	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (!user) {
			throw new UnauthorizedException('Usuário não autenticado.');
		}

		const roleIds = Array.isArray(user.roles)
			? user.roles
			: Array.isArray(user.user?.roles)
				? user.user.roles
				: [];

		const hasAdminRole =
			user.role === 'ADMIN' || roleIds.includes(AdminRoleGuard.ADMIN_ROLE_ID);

		if (!hasAdminRole) {
			throw new ForbiddenException(
				'Apenas usuários com a role ADMIN podem acessar este recurso.'
			);
		}

		return true;
	}
}
