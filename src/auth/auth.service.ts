import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { LoginDto, UserDataToken } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async generateToken(dataToken: UserDataToken) {
    return this.jwtService.sign(dataToken);
  }

  async login(loginUser: LoginDto) {
    const user = await this.usersService.findByEmailWithPassword(loginUser.email);
    if (!user) {
      throw new UnauthorizedException('Las credenciales no son validas');
    }
    const isMatch = await loginUser.comparePassword(user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Las credenciales no son validas');
    }

    return {
      access_token:await this.generateToken({
        sub: user._id.toString(),
        email: user.email,
        role: user.role,
      }),
      user,
    };
  }

  async register(user: CreateUserDto) {
    try {
      const existEmailUser = await this.usersService.existEmailUser(user.email);
      if (existEmailUser) {
        throw new ConflictException('El correo ya existe');
      }

      return await this.usersService.create(user);
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Users not found');
    }
  }
}
