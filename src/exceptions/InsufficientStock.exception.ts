import { HttpException } from "@nestjs/common";

export class InsufficientStockException extends HttpException {
    constructor(productId: number) {
        super(`Insufficient stock for product with ID ${productId}`, 409);
    }
}
