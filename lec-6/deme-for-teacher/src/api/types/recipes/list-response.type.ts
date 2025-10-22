export interface ListResponse<T> {
  recipes: T[]
  total: number
  skip: number
  limit: number
}
