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
import { TasksService } from './tasks.service';
import { CreateTaskDto } from '../tasks/dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new NotFoundException('Task does not exist');
    }

    return task;
  }

  @Post()
  async createTask(@Body() task: CreateTaskDto) {
    try {
      return await this.tasksService.create(task);
    } catch (e) {
      throw new ConflictException('Task already exists');
    }
  }

  @Delete(':id')
  @HttpCode(204) //No es necesario devolver algo solo el código
  async deleteTask(@Param('id') id: string) {
    const task = await this.tasksService.delete(id);
    if (!task) {
      throw new NotFoundException('Task does not exist');
    }
  }
}
