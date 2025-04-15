import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RateLimitMiddleware } from './middlewares/rate-limit/rate-limit.middleware';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payments/payments.module';
import { CartsModule } from './carts/carts.module';
import { ProductsModule } from './products/products.module';
@Module({
  imports: [UsersModule, OrdersModule, PaymentsModule, CartsModule, ProductsModule,],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(RateLimitMiddleware).forRoutes('*'); 
  }
}
