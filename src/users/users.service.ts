import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { UpdateTaskDto } from '../tasks/dto/update-task.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findAll() {
    return await this.userModel.find();
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async findByEmailWithPassword(email: string) {
    return await this.userModel.findOne({ email: email }).select('+password');
  }

  async existEmailUser(email: string, id?: string | undefined) {
    const user = await this.userModel.find({
      email: email,
      status: 1,
    });
    if (user.length > 0) {
      if (id) {
        if (user[0]._id.toString() != id) {
          return true;
        }
      } else {
        return true;
      }
    }
    return false;
  }

  async create(user: CreateUserDto) {
    await user.encryptPassword();
    const newUser = new this.userModel(user);

    return await newUser.save();
  }

  async delete(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async update(id: string, task: UpdateTaskDto) {
    return await this.userModel.findByIdAndUpdate(id, task);
  }
}
