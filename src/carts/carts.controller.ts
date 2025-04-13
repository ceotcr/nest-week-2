import { Controller, Get, Param, ParseIntPipe, Post, Body, Delete, } from '@nestjs/common';
import { CartsService } from './carts.service';
import { AddProductToCartDto } from './dto/AddProductToCartDto';

@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) { }

    @Get(':userId')
    getCart(@Param('userId', ParseIntPipe) userId: number) {
        return this.cartsService.getCartByUserId(userId);
    }

    @Post()
    addProductToCart(@Body() body: AddProductToCartDto) {
        return this.cartsService.addToCart(body.userId, body.productId, body.quantity);
    }

    @Get()
    getCarts() {
        return this.cartsService.getCarts();
    }

    @Delete(':userId')
    clearCart(@Param('userId', ParseIntPipe) userId: number) {
        return this.cartsService.clearCart(userId);
    }
}
