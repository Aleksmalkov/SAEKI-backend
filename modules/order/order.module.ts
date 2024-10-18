import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderResolver } from './order.resolver';
import { OrderDocument, OrderSchema } from './order.schema';
import { AuthModule } from '../../auth/auth.module';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    AuthModule
  ],
  providers: [OrderService, OrderResolver, JwtAuthGuard],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}
