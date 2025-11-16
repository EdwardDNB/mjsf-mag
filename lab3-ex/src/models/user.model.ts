// src/models/user.model.ts
import type { User } from "@/types";
import { BaseModel } from "@/models/base.model";

export class UserModel extends BaseModel implements User {
	id: number;
	name: string;
	email: string;
	password?: string;

	constructor(data: User) {
		super(data);
		this.init(data);
	}

	// Додатковий метод
	public shortName(): string {
		return this.name.split(" ")[0];
	}
}
