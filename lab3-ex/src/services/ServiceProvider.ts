import httpClient from "@/utils/http-client";
import { CategoriesService } from "@/services/categories.service";
import { ProductService } from "@/services/ProductService"; // перевір назву файлу
import { UserService } from "@/services/UserService";       // виправлений шлях


export class ServiceProvider {
  categories = new CategoriesService(httpClient);
  products = new ProductService(httpClient);
  users = new UserService(httpClient);
}

export const serviceProvider = new ServiceProvider();
