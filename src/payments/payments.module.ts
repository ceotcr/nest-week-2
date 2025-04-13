import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { CartsModule } from 'src/carts/carts.module';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [CartsModule, ProductsModule],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule { }
