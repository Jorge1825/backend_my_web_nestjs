import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({ required: true, trim: true, uppercase: true, type: String })
  name: string;

  @Prop({ required: true, trim: true, type: String })
  description: string;

  @Prop({ required: true, trim: true, type: String })
  color: string;

  @Prop({ type: Number, default: 0, min: 0, max: 1 })
  status: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
