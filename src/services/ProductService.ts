import { IProduct } from "../interfaces/IProduct";

const baseUrl = "https://dummyjson.com";

type getProductsResponse = {
  products: IProduct[];
  total: number;
  limit: number;
};

export async function getProducts(
  category: string | null,
  limit: number,
  skip: number,
  sortValue: string | null
): Promise<getProductsResponse> {
  let queryPath = `/products`;

  if (category) {
    queryPath += `/category/${category}`;
  }

  queryPath += `?limit=${limit}&skip=${skip}`;

  if (sortValue && sortValue.includes("-")) {
    let sort = sortValue.split("-");
    queryPath += `&sortBy=${sort[0]}&order=${sort[1]}`;
  }

  console.log(`${baseUrl}${queryPath}`);

  const response = await fetch(`${baseUrl}${queryPath}`);
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
