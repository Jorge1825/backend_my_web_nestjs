import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true,
      }
    
    ),
    MongooseModule.forRoot('mongodb://localhost/nest-tasks'),
    TasksModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
