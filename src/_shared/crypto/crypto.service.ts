import { Injectable } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';
require('dotenv').config({ path: '.env' });

@Injectable()
export class CryptoService {
	encryptPassword(text: string) {
		return createHmac('sha256', process.env.CRYPTO_KEY ?? '')
			.update(text)
			.digest('hex');
	}

	comparePassword(rawPassword: string, hashedPassword: string) {
		const rawPasswordHash = this.encryptPassword(rawPassword);
		const rawBuffer = Buffer.from(rawPasswordHash);
		const hashBuffer = Buffer.from(hashedPassword ?? '');
		if (rawBuffer.length !== hashBuffer.length) {
			return false;
		}
		return timingSafeEqual(rawBuffer, hashBuffer);
	}
}
