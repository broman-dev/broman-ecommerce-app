import { IProduct } from "../interfaces/IProduct";

const baseUrl = "https://dummyjson.com";

type getProductsResponse = {
  products: IProduct[];
  total: number;
};

export async function getProducts(
  limit: number,
  skip: number
): Promise<getProductsResponse> {
  const response = await fetch(
    `${baseUrl}/products?limit=${limit}&skip=${skip}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await (response.json() as Promise<getProductsResponse>);
}

export async function getProductsByCategory(
  category: string,
  limit: number,
  skip: number
): Promise<getProductsResponse> {
  const response = await fetch(
    `${baseUrl}/products/category/${category}?limit=${limit}&skip=${skip}`
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await (response.json() as Promise<getProductsResponse>);
}

export async function getProductsById(id: number): Promise<IProduct> {
  const response = await fetch(`${baseUrl}/products/${id}`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await (response.json() as Promise<IProduct>);
}
