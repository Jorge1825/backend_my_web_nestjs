import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    try {
      return await this.usersService.findAll();
    } catch (e) {
      console.log(e);
      throw new NotFoundException('Users not found');
    }
  }

 
}
