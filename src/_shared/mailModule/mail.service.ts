import { Injectable } from '@nestjs/common';
require('dotenv').config({ path: '.env' });

@Injectable()
export class MailService {
	sendMailCriacaoConta(
		validate: any,
		sendEmail: string,
		nome: string,
		id: number
	) {
		if (!validate) {
			const sgMail = require('@sendgrid/mail');
			sgMail.setApiKey(process.env.SENDGRID_API_KEY);
			const msg = {
				to: sendEmail, // Change to your recipient
				from: 'scaffold@mail.com', // Change to your verified sender
				subject: 'Scaffold - Create Account',
				html: `<h1>Bem-vindo ao sistema!</h1>
			<p>${nome}, para confirmar seu email, clique no link abaixo:</p>
			<p><a href="http://localhost:3000/person/${id}/validate">Confirmar E-mail</a></p>
			<p>Equipe HOURLY</p>`,
			};
			sgMail
				.send(msg)
				.then(() => {
					console.log('Email enviado');
				})
				.catch((error) => {
					console.log(error);
					console.error(error.response.body);
				});
		}
	}

	sendMailForgotPassword(sendEmail: string, token: string) {
		const sgMail = require('@sendgrid/mail');
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
			to: sendEmail, // Change to your recipient
			from: 'scaffold@mail.com', // Change to your verified sender
			subject: 'Scaffold - Recovery Password',
			html: `<h1>Recuperação de senha HOURLY</h1>
			<p>Para resetar a sua senha, clique no link abaixo:</p>
			<p><a href="http://localhost:4200/#/auth/forgot-token/${token}">Resetar Senha</a></p>
			<p>Equipe HOURLY</p>`,
		};
		sgMail
			.send(msg)
			.then(() => {
				console.log('Email enviado');
			})
			.catch((error) => {
				console.log(error);
				console.error(error.response.body);
			});
	}
}
