import { Resolver,Query, Mutation, Args } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderResponse } from './order-response.model';
import { CreateOrderDto } from './dto/create-order.dto';

@Resolver()
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => OrderResponse)
  async createOrder(@Args('input') createOrderDto: CreateOrderDto) {
    console.log(createOrderDto);
    return this.orderService.createOrder(createOrderDto);
  }

  @Query(() => [OrderResponse])
  async getAllOrders(): Promise<OrderResponse[]> {
    return this.orderService.getAllOrders();
  }
}
