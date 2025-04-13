import { IsInt, IsNotEmpty, IsPositive } from "class-validator";

export class AddProductToCartDto {
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsNotEmpty()
    @IsInt()
    productId: number;

    @IsPositive()
    @IsInt()
    @IsNotEmpty()
    quantity: number;
}