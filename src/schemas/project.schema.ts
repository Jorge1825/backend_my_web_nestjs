import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Language } from './language.schema';
import { Category } from './category.schema';

@Schema({
  timestamps: true,
})
export class Project {
  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    trim: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Language',
  })
  language: Language[];

  @Prop({
    required: true,
    trim: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category[];

  @Prop({ required: true, type: Number, min: 1, max: 10, default: 1 })
  difficulty: number;

  @Prop({ trim: true, type: String })
  url: string;

  @Prop({ type: Number, default: 0 })
  fav: number;

  @Prop({ type: Number, default: 0 })
  likes: number;

  @Prop({ required: true, type: Array })
  urlImgs: string[];

  @Prop({ type: Number, default: 0, min: 0, max: 1 })
  status: number;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
