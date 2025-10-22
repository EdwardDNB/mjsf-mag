import type {Recipe} from "@/api/types/recipes/recipe.type.ts";
import type {ListResponse} from "@/api/types/recipes/list-response.type.ts";

const BASE_URL = 'https://dummyjson.com/recipes'

export class RecipeService {
  async getAll(options?: {
    limit?: number;
    skip?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
    select?: string
  }): Promise<ListResponse<Recipe>> {
    const params = new URLSearchParams()
    if (options?.limit != null) params.append('limit', String(options.limit))
    if (options?.skip != null) params.append('skip', String(options.skip))
    if (options?.sortBy) params.append('sortBy', options.sortBy)
    if (options?.order) params.append('order', options.order)
    if (options?.select) params.append('select', options.select)

    const url = `${BASE_URL}?${params.toString()}`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to fetch recipes (getAll). Status: ${res.status}`)
    }
    const data = await res.json()
    return data as ListResponse<Recipe>
  }

  async getById(id: number): Promise<Recipe> {
    const url = `${BASE_URL}/${id}`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to fetch recipe id=${id}. Status: ${res.status}`)
    }
    const data = await res.json()
    return data as Recipe
  }

  async search(query: string, options?: {
    limit?: number;
    skip?: number
  }): Promise<ListResponse<Recipe>> {
    const params = new URLSearchParams()
    params.append('q', query)
    if (options?.limit != null) params.append('limit', String(options.limit))
    if (options?.skip != null) params.append('skip', String(options.skip))

    const url = `${BASE_URL}/search?${params.toString()}`
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`Failed to search recipes. Status: ${res.status}`)
    }
    const data = await res.json()
    return data as ListResponse<Recipe>
  }

}

export const recipeService = new RecipeService()
