import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class OrderDocument extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ nullable: true })
  company: string;

  @Prop({ required: true })
  material: string;

  @Prop({ required: true })
  fileUrl: string;

  @Prop({ nullable: true })
  cardType: string;

  @Prop({ nullable: true })
  cardNumber: string;

  @Prop({ required: false })
  purchaseOrder: string | null;

  @Prop()
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(OrderDocument);
