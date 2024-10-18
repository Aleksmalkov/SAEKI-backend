import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { OrderDocument } from '../order/order.schema';
import { User } from 'auth/user.model';

@Schema({ timestamps: true })
export class QuestionDocument extends Document {
  
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true }) 
  user: User;

  @Prop({ type: String, required: true })
  content: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Order', required: true })
  order: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const QuestionSchema = SchemaFactory.createForClass(QuestionDocument);
