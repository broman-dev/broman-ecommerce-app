import { IProduct } from "../interfaces/IProduct";

const baseUrl = "https://dummyjson.com";

type getProductsResponse = {
  products: IProduct[];
  total: number;
};

export async function getProducts(
  limit: number,
  skip: number,
  sortValue: string | null
): Promise<getProductsResponse> {
  let apiPath = `${baseUrl}/products?limit=${limit}&skip=${skip}`;
  if (sortValue && sortValue.includes('-')) {
    let sort = sortValue.split("-");
    apiPath += `&sortBy=${sort[0]}&order=${sort[1]}`;
  }
  const response = await fetch(apiPath);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await (response.json() as Promise<getProductsResponse>);
}

export async function getProductsByCategory(
  category: string,
  limit: number,
  skip: number,
  sortValue: string | null
): Promise<getProductsResponse> {
  let apiPath = `${baseUrl}/products/category/${category}?limit=${limit}&skip=${skip}`;
  if (sortValue && sortValue.includes('-')) {
    let sort = sortValue.split("-");
    apiPath += `&sortBy=${sort[0]}&order=${sort[1]}`;
  }
  const response = await fetch(apiPath);
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
