import {
  IsString,
  IsOptional,
  IsNotEmpty,
  IsIn,
  IsEmail,
  Length,
} from 'class-validator';
import { RoleUser } from 'src/schemas/user.schema';
import { hashSync, compareSync } from 'bcryptjs';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsString({
    message: 'El nombre debe ser un texto',
  })
  @IsNotEmpty({
    message: 'El nombre no debe estar vacío',
  })
  name: string;

  @IsEmail(
    {
      host_whitelist: ['gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com'], // solo admitir correos de estos dominios
      allow_utf8_local_part: true, // admitir caracteres UTF-8
    },
    {
      message: 'El correo es invalido',
    },
  )
  @IsNotEmpty({
    message: 'El email no debe estar vacío',
  })
  email: string;


  @Transform(({ value }) => value.trim())
  @IsString({
    message: 'La contraseña debe ser un texto',
  })
  @IsNotEmpty({
    message: 'La contraseña no debe estar vacía',
  })
  //la contraseña debe ser minimo 6 caracteres y maximo 2
  @Length(6, 20, {
    message: 'La contraseña debe tener entre 6 y 20 caracteres',
  })
  password: string;

  @IsIn([RoleUser.ADMIN, RoleUser.SUPER, RoleUser.USER], {
    message: 'El rol no es valido',
  })
  role: RoleUser;

  async encryptPassword() {
    this.password = hashSync(this.password, 10);
  }

  async comparePassword(password: string) {
    return compareSync(password, this.password);
  }
}
