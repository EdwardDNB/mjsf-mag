// src/models/product.model.ts
import type { Product } from "@/types";
import { BaseModel } from "@/models/base.model";

export class ProductModel extends BaseModel implements Product {
	id: number;
	title: string;
	price: number;
	description?: string;
	categoryId: number;
	images?: string[];

	constructor(data: Product) {
		super(data);
		this.init(data);
	}

	// Додатковий метод для зручності
	public displayPrice(): string {
		return `$${this.price.toFixed(2)}`;
	}
}
