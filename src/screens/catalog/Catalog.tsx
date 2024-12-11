import { useEffect, useLayoutEffect, useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import ProductCard from "../../components/productCard/ProductCard";
import {
  getProducts,
  getProductsByCategory,
} from "../../services/ProductService";
import { useParams, useSearchParams } from "react-router-dom";
import "./Catalog.scss";
import Layout from "../../components/layout/Layout";

function Catalog() {
  const { category } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [heroProduct, setHeroProduct] = useState<IProduct | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(
    searchParams.get("page") as unknown as number
  );

  useEffect(() => {
    const randomProductIndex = Math.floor(Math.random() * products.length);
    setHeroProduct(products[randomProductIndex]);
  }, [products]);

  useLayoutEffect(() => {
    const limit = 9;
    const skip = currentPage * limit - 1;
    if (category) {
      getProductsByCategory(category, limit, skip).then((response) =>
        setProducts(response.products)
      );
    } else {
      getProducts(limit, skip).then((response) =>
        setProducts(response.products)
      );
    }
  }, [currentPage]);

  return (
    <Layout>
      {products.map((product) => (
        <ProductCard key={product.id} item={product} />
      ))}
    </Layout>
  );
}

export default Catalog;
