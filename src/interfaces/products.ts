export interface CreateProduct {
    name: string;
    price: number;
    stock: number;
}

export interface Product extends CreateProduct {
    id: number;
}

export interface UpdateProduct {
    name?: string;
    price?: number;
    stock?: number;
}
