import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    @IsPositive()
    price: number;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    stock: number;
}