import { TaskStatus } from '../../schemas/task.schema';
import { IsString, IsOptional, IsNotEmpty, IsIn } from 'class-validator';

export class UpdateTaskDto {
  @IsString({
    message: 'El título debe ser un texto',
  })
  @IsNotEmpty({
    message: 'El título no debe estar vacío',
  })
  title?: string;

  @IsString({
    message: 'La descripción debe ser un texto',
  })
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE], {
    message: `El estado debe ser uno de los siguientes valores: ${TaskStatus.OPEN}, ${TaskStatus.IN_PROGRESS}, ${TaskStatus.DONE}`,
  })
  status?: TaskStatus;
}
