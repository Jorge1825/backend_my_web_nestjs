import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userLogin: CreateUserDto) {
    return this.authService.login(userLogin);
  }

  @Get('profile')
  @UseGuards(AuthGuard)
  profile() {
    return { message: 'Profile' };
  }

  @Post('register')
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
