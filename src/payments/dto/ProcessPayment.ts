import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class ProcessPaymentDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    @IsPositive()
    amount: number;

    @IsString()
    @IsNotEmpty()
    status: string;

    transactionInfo: {
        transactionId: string;
        paymentMethod: string;
    } | null;
}