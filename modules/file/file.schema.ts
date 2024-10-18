import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FileDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  url: string;
}

export const FileSchema = SchemaFactory.createForClass(FileDocument);
