import { Module } from '@nestjs/common';

import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { BaseController } from './app.controller';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProjectsModule } from './projects/projects.module';
import { LanguagesModule } from './languages/languages.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_CNN),
    TasksModule,
    UsersModule,
    CategoriesModule,
    ProjectsModule,
    LanguagesModule,
    AuthModule,
  ],
  providers: [],
  controllers: [BaseController],
})
export class AppModule {}
