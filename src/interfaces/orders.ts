export interface CreateOrder {
    userId: number;
    items: OrderItem[];
    total: number;
    status: string;
}

export interface OrderItem {
    productId: number;
    quantity: number;
}

export interface Order extends CreateOrder {
    id: number;
}
