import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  controllers: [CartsController],
  imports: [ProductsModule],
  providers: [CartsService],
  exports: [CartsService],
})
export class CartsModule { }
