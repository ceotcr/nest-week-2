export interface Cart {
    userId: number;
    items: CartItem[];
    total: number;
}

export interface CartItem {
    productId: number;
    quantity: number;
}
