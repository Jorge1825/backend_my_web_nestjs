import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { RoleUser } from '../common/enums/roles.enum';


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
    select: false,
  })
  password: string;

  @Prop({
    default: RoleUser.USER,
    type: String,
    enum: RoleUser,
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
export { RoleUser };

