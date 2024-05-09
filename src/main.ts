import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(
    {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,  
      optionsSuccessStatus: 204, 
      
    }
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //para que solo los campos que esten en el DTO sean aceptados
      forbidNonWhitelisted: true, //para que no se acepten campos que no esten en el DTO
      transform: true, //para que los parametros que lleguen por la url se transformen a su tipo de dato
    }),
  );
  app.setGlobalPrefix('api');
  app.use(morgan('dev'));

  const config = new DocumentBuilder()
    .setTitle('API DEVEGEORGE')
    .setDescription('API para el proyecto de DEVEGEORGE')
    .setVersion('1.0')
    .addTag('DEVEGEORGE')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
