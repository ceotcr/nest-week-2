import { IsIn, IsInt, IsNotEmpty, IsPositive } from "class-validator";
import { OrderItem } from "src/interfaces/orders";

export class CreateOrderDto {

    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    items: OrderItem[];

    @IsNotEmpty()
    @IsPositive()
    total: number;

    @IsNotEmpty()
    @IsIn(['cancelled', 'pending', 'delivered'])
    status: string;
}