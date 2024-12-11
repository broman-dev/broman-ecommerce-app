import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import ProductCard from "../../components/productCard/ProductCard";
import {
  getProducts,
  getProductsByCategory,
} from "../../services/ProductService";
import { useParams, useSearchParams } from "react-router-dom";
import "./Catalog.scss";
import Layout from "../../components/layout/Layout";
import LoadingWrapper from "../../components/ui/loadingWrapper/LoadingWrapper";
import Pagination from "../../components/ui/pagination/Pagination";
import { Select } from "../../components/ui/select/Select";
import { Option } from "../../components/ui/select/Option";

const sortingOptions = [
  {
    value: "unsorted",
    title: "Unsorted",
  },
  {
    value: "price-asc",
    title: "Price: low to hight",
  },
  {
    value: "price-desc",
    title: "Price: hight to low",
  },
];

export const Catalog: FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<IProduct[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [itemsCount, setItemsCount] = useState<number>(0);

  const [sortOptIndex, setSortOptIndex] = useState<number>(0);

  const pageQueryParam = (searchParams.get("page") ?? 1) as number;
  const [currentPage, setCurrentPage] = useState<number>(pageQueryParam);

  useLayoutEffect(() => {
    const skip = currentPage * itemsPerPage - 1;
    if (category) {
      getProductsByCategory(
        category,
        itemsPerPage,
        skip,
        sortingOptions[sortOptIndex]?.value ?? null
      ).then((response) => {
        setProducts(response.products);
        setItemsCount(response.total);
        setIsLoading(false);
      });
    } else {
      getProducts(
        itemsPerPage,
        skip,
        sortingOptions[sortOptIndex]?.value ?? null
      ).then((response) => {
        setProducts(response.products);
        setItemsCount(response.total);
        setIsLoading(false);
      });
    }
  }, [currentPage, sortOptIndex]);

  const paginationHandler = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      behavior: "smooth",
      top: scrollRef.current!.getBoundingClientRect().x - 60,
    });
  };

  const sortingHandler = (option: Option, index: number) => {
    setSortOptIndex(index);
  };

  return (
    <>
      <Layout>
        <LoadingWrapper isLoading={isLoading}>
          <div className="catalog-header" ref={scrollRef}>
            <div>
              <span className="section-title">Catalog</span>
              <span>
                Showing{" "}
                <strong>
                  {itemsPerPage * (currentPage - 1) + 1}-
                  {itemsPerPage * currentPage}
                </strong>{" "}
                of <strong>{itemsCount}</strong> products
              </span>
            </div>
            <div className="sorting-wrapper">
              <span>Sort by </span>
              <Select
                options={sortingOptions}
                selectedIndex={0}
                onChange={sortingHandler}
                placeholder="Select criteria"
              />
            </div>
          </div>

          <div className="catalog-grid">
            {products.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </div>
          <div className="pagination-wrapper">
            <Pagination
              onChange={paginationHandler}
              itemsPerPage={itemsPerPage}
              itemsCount={itemsCount}
              currentPage={currentPage}
              span={3}
            />
          </div>
        </LoadingWrapper>
      </Layout>
    </>
  );
};

export default Catalog;
