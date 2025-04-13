import { Injectable, NotFoundException } from '@nestjs/common';
import { InsufficientStockException } from 'src/exceptions/InsufficientStock.exception';
import { CreateProduct, Product, UpdateProduct } from 'src/interfaces/products';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        { id: 1, name: 'Product 1', price: 100, stock: 10 },
        { id: 2, name: 'Product 2', price: 200, stock: 0 },
        { id: 3, name: 'Product 3', price: 300, stock: 2 },
    ];

    getAllProducts() {
        return this.products;
    }

    getProductById(id: number) {
        return this.products.find(product => product.id === id);
    }

    createProduct(product: CreateProduct) {
        const newProduct = {
            id: this.products.length + 1,
            ...product,
        };
        this.products.push(newProduct);
        return newProduct;
    }

    updateProduct(id: number, product: UpdateProduct) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            return null;
        }
        this.products[index] = { ...this.products[index], ...product };
        return this.products[index];
    }

    deleteProduct(id: number) {
        const index = this.products.findIndex(p => p.id === id);
        if (index === -1) {
            return null;
        }
        const deletedProduct = this.products[index];
        this.products.splice(index, 1);
        return deletedProduct;
    }

    validateProductStock(id: number, quantity: number) {
        const product = this.getProductById(id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        if (product.stock < quantity) {
            throw new InsufficientStockException(id);
        }
    }
}
