import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Auth } from './decorators/auth.decorator';
import { RoleUser } from '../common/enums/roles.enum';
import { UserRequest } from '../common/decorators/user-request.decorator';
import { UserRequestI } from 'src/common/interface/user-request.interface';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() userLogin: LoginDto) {
    return this.authService.login(userLogin);
  }

  @Get('profile')
  @Auth([RoleUser.ADMIN])
  profile(@UserRequest() user: UserRequestI) {
    return { message: 'Profile' };
  }

  @Post('register')
  @ApiCreatedResponse({
    description: 'The user has been successfully registered.',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }
}
