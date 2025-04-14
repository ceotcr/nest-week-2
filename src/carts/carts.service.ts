import { Injectable, NotFoundException } from '@nestjs/common';
import { InsufficientStockException } from 'src/exceptions/InsufficientStock.exception';
import { Cart } from 'src/interfaces/cart';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class CartsService {
    constructor(private readonly productsService: ProductsService) { }
    carts: Cart[] = []

    getCarts(): Cart[] {
        return this.carts;
    }

    getCartByUserId(userId: number): Cart | undefined {
        return this.carts.find(cart => cart.userId === userId);
    }

    addToCart(userId: number, productId: number, quantity: number): Cart {
        const cart = this.getCartByUserId(userId);
        const product = this.productsService.getProductById(productId);
        if (!product) {
            throw new NotFoundException('Product not found');
        }
        if (!cart) {
            const newCart: Cart = {
                userId,
                items: [],
                total: 0,
            };
            this.carts.push(newCart);
            this.addToCart(userId, productId, quantity);
            return newCart;
        }
        const itemIndex = cart.items.findIndex(item => item.productId === productId);

        if (quantity > product.stock) {
            throw new InsufficientStockException(product.id);
        }

        if (itemIndex > -1) {
            if (cart.items[itemIndex].quantity + quantity > product.stock) {
                throw new InsufficientStockException(product.id);
            }
            cart.items[itemIndex].quantity += quantity;
        }
        else {
            cart.items.push({ productId, quantity });
        }
        cart.total += product.price * quantity;
        return cart;
    }

    removeFromCart(userId: number, productId: number): Cart | undefined {
        const cart = this.getCartByUserId(userId);
        if (!cart) {
            return undefined;
        }
        const itemIndex = cart.items.findIndex(item => item.productId === productId);
        if (itemIndex > -1) {
            const product = this.productsService.getProductById(productId);
            if (!product) {
                throw new NotFoundException('Product not found');
            }
            cart.total -= product.price * cart.items[itemIndex].quantity;
            cart.items.splice(itemIndex, 1);
        }
        return cart;
    }

    clearCart(userId: number): Cart | undefined {
        const cart = this.getCartByUserId(userId);
        if (cart) {
            cart.items = [];
            cart.total = 0;
        }
        return cart;
    }
}

