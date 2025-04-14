import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CartsService } from 'src/carts/carts.service';
import { Payment } from 'src/interfaces/payments';
import { OrdersService } from 'src/orders/orders.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class PaymentsService {
    payments: Payment[] = []
    constructor(private readonly cartsService: CartsService, private readonly productsService: ProductsService, private readonly ordersService: OrdersService) { }

    processPayment(userId: number, amount: number, status: string, transactionInfo: { transactionId: string, paymentMethod: string } | null) {
        const cart = this.cartsService.getCartByUserId(userId);
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }
        if (cart.total !== amount) {
            throw new HttpException('Incorrect payment amount, any deducted amount will be refunded!', 400);
        }
        cart.items.forEach(item => {
            this.productsService.validateProductStock(item.productId, item.quantity);
        });
        cart.items.forEach(item => {
            const product = this.productsService.getProductById(item.productId);
            if (product) {
                product.stock -= item.quantity;
                this.productsService.updateProduct(product.id, { stock: product.stock });
            }
        })
        const payment: Payment = {
            id: this.payments.length + 1,
            userId,
            amount: cart.total,
            status,
            createdAt: new Date(),
            updatedAt: new Date(),
            transactionInfo
        };
        this.payments.push(payment);
        this.ordersService.createOrder({ userId, items: cart.items, status: "pending", total: cart.total });
        const total = cart.total
        this.cartsService.clearCart(userId);
        return ({
            message: `Payment of $${total} processed for user ${userId}`,
            paymentDetails: payment,
        })
    }

    getPaymentById(id: number): Payment | undefined {
        return this.payments.find(payment => payment.id === id);
    }

    getPaymentsByUserId(userId: number): Payment[] {
        return this.payments.filter(payment => payment.userId === userId);
    }

    getAllPayments(): Payment[] {
        return this.payments;
    }
}