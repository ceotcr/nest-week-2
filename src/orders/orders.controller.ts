import { Controller, Get, Post, Param, ParseIntPipe, Body, Patch } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/CreateOrderDto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }
    @Get()
    getOrders() {
        return this.ordersService.getOrders();
    }

    @Get('/:id')
    getOrderById(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.getOrderById(id);
    }

    @Get('/user/:userId')
    getOrdersByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return this.ordersService.getOrdersByUserId(userId);
    }

    @Post()
    createOrder(@Body() body: CreateOrderDto) {
        return this.ordersService.createOrder(body);
    }

    @Patch('/:id')
    changeStatus(@Param('id', ParseIntPipe) id: number, @Body('status') status: string) {
        return this.ordersService.changeStatus(id, status);
    }
}
