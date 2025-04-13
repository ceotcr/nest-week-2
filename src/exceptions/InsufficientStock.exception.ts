export class InsufficientStockException extends Error {
    constructor(productId: number) {
        super(`Insufficient stock for product with ID: ${productId}`);
        this.name = 'InsufficientStockException';
    }
}
