import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';


export enum RoleUser {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER = 'SUPER',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    trim: true,
    type: String,
    uppercase: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  password: string;

  @Prop({
    default: RoleUser.USER,
    type: String,
  })
  role: RoleUser;

  @Prop({
    default: 1,
    min: 0,
    max: 1,
    type: Number,
  })
  status: number;

}

export const UserSchema = SchemaFactory.createForClass(User);
