import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrder, Order } from 'src/interfaces/orders';

@Injectable()
export class OrdersService {
    orders: Order[] = []
    getOrders() {
        return this.orders;
    }
    getOrdersByUserId(userId: number) {
        return this.orders.filter(order => order.userId === userId);
    }
    getOrderById(id: number) {
        const order = this.orders.find(order => order.id === id);
        if (!order) {
            throw new NotFoundException('Order not found');
        }
        return order;
    }

    createOrder(order: CreateOrder) {
        const newOrder = { ...order, id: this.orders.length + 1 };
        this.orders.push(newOrder);
        return newOrder;
    }

    changeStatus(id: number, status: string) {
        const order = this.getOrderById(id);
        order.status = status;
        return order;
    }
}
