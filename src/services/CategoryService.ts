import { ICategory } from "../interfaces/ICategory";

const baseUrl = "https://dummyjson.com";

export async function getAllCategories(): Promise<ICategory[]> {
  const response = await fetch(`${baseUrl}/products/categories`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await (response.json() as Promise<ICategory[]>);
}
