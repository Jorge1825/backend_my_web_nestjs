import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RequestWithUser } from './interface/requestUser.interface';
import { RoleUser } from 'src/schemas/user.schema';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userLogin: CreateUserDto) {
    return this.authService.login(userLogin);
  }

  @Get('profile')
  @Auth([RoleUser.ADMIN])
  profile(@Req() req: RequestWithUser) {
    return { message: 'Profile' };
  }

  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
