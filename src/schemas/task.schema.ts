import { Schema,Prop,SchemaFactory } from '@nestjs/mongoose';

export enum TaskStatus{
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

@Schema(
    {
        timestamps: true
    }
)
export class Task{
    @Prop({
        required: true,
        trim: true,
        type: String

    })
    title: string;

    @Prop({
        required: true,
        trim: true,
        type: String
        
    })
    description: string;

    @Prop({
        default: TaskStatus.OPEN,
        enum: TaskStatus,
    })
    status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task)