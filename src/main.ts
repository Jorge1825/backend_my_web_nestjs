import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true, //para que solo los campos que esten en el DTO sean aceptados
      forbidNonWhitelisted: true, //para que no se acepten campos que no esten en el DTO
      transform: true, //para que los parametros que lleguen por la url se transformen a su tipo de dato
    }
  ));
  app.setGlobalPrefix('api');
  app.use(morgan('dev'));

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
