export interface Payment {
    id: number;
    userId: number;
    amount: number;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    transactionInfo: {
        transactionId: string;
        paymentMethod: string;
    } | null;
}