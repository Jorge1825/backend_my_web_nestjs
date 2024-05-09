import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true, // para que el modulo sea global
      signOptions: { expiresIn: '7d', algorithm: 'HS256' },
      secretOrKeyProvider: (requestType, tokenOrPayload, verifyOrSign) => {
        return process.env.JWT_SECRET;
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
