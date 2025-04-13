import { Controller, Get, Post, Param, ParseIntPipe, Body } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { ProcessPaymentDto } from './dto/ProcessPayment';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) { }

    @Post()
    processPayment(@Body() body: ProcessPaymentDto) {
        return this.paymentsService.processPayment(body.userId, body.amount, body.status, body.transactionInfo);
    }
    @Get(':userId')
    getPaymentsByUserId(@Param('userId', ParseIntPipe) userId: number) {
        return this.paymentsService.getPaymentsByUserId(userId);
    }
    @Get()
    getAllPayments() {
        return this.paymentsService.getAllPayments();
    }
    @Get('payment/:id')
    getPaymentById(@Param('id', ParseIntPipe) id: number) {
        return this.paymentsService.getPaymentById(id);
    }
}
