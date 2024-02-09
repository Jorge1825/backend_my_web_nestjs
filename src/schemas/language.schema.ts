import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
}) 
export class Language {
  @Prop({ required: true, trim: true, uppercase: true, type: String })
  name: string;

  @Prop({ required: true, trim: true, type: String })
  description: string;

  @Prop({ required: true, trim: true, type: String })
  color: string;

  @Prop({type: Number, default: 0, min: 0, max: 1 })
  status: number;

  @Prop({ required: true, type: String })
  urlImg: string;
}

export const LanguageSchema = SchemaFactory.createForClass(Language);
