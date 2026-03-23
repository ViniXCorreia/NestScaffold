import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
require('dotenv').config({ path: '.env' });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any) {
		const user =
			typeof payload.user === 'object'
				? payload.user
				: {
						id: payload.user,
						roles: payload.roles ?? [],
				  };

		return {
			role: payload.role,
			roles: user.roles ?? [],
			user,
			userId: user.id,
		};
	}
}
