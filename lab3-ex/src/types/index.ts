export interface Category {
    id: number
    name: string
    image: string
}
export interface Product {
    id: number;
    title: string;
    price: number;
    description?: string;
    categoryId: number;
    images?: string[];
}

export interface User {
    id: number;
    name: string;
    email: string;
    password?: string;
}