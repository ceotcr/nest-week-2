import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/CreateProduct';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }
    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productsService.getProductById(id);
    }
    @Post()
    createProduct(@Body() product: CreateProductDto) {
        return this.productsService.createProduct(product);
    }
}
