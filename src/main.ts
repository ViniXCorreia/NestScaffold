import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());

	const swaggerConfig = new DocumentBuilder()
		.setTitle('Nest Postgres Scaffold API')
		.setDescription('Documentacao da API')
		.setVersion('1.0.0')
		.addBearerAuth(
			{
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT',
				description: 'Informe o token JWT no formato Bearer',
			},
			'bearer'
		)
		.build();
	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

	SwaggerModule.setup('docs', app, swaggerDocument, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});

	await app.listen(3000);
}
bootstrap();
