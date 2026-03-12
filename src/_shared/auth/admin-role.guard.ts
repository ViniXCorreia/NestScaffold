import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminRoleGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest();
		const user = request.user;

		if (!user) {
			throw new UnauthorizedException('Usuário não autenticado.');
		}

		const roleNames = Array.isArray(user.roleNames)
			? user.roleNames
			: Array.isArray(user.user?.roleNames)
				? user.user.roleNames
				: [];

		const hasAdminRole =
			user.role === 'ADMIN' ||
			roleNames.includes('ADMIN') ||
			(Array.isArray(user.roles) && user.roles.includes('ADMIN'));

		if (!hasAdminRole) {
			throw new ForbiddenException(
				'Apenas usuários com a role ADMIN podem acessar este recurso.'
			);
		}

		return true;
	}
}
