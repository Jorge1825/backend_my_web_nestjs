import { compareSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
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

  async comparePassword(password: string) {
    return compareSync(this.password, password);
  }
}


export class UserDataToken {
  sub: string;
  email: string;
  role: string;
}
