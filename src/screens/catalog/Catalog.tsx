import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import ProductCard from "../../components/productCard/ProductCard";
import {
  getProducts,
  getProductsByCategory,
} from "../../services/ProductService";
import { useParams, useSearchParams, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [products, setProducts] = useState<IProduct[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    category ?? null
  );

  const pageQueryParam = (searchParams.get("page") ?? 1) as number;
  const [currentPage, setCurrentPage] = useState<number>(pageQueryParam);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [itemsCount, setItemsCount] = useState<number>(0);
  const [fetchedCount, setFetchedCount] = useState<number>(0);
  const [skipCount, setSkipCount] = useState<number>(currentPage * itemsPerPage - itemsPerPage);

  const [sortOptIndex, setSortOptIndex] = useState<number>(0);



  useEffect(() => {
    const pathname = location.pathname.split('/');
    if (pathname.length == 3)
    {
      setSelectedCategory(pathname[2]);
    }
    else {
      setSelectedCategory(null);
    }

    setCurrentPage((searchParams.get("page") ?? 1) as number);
  }, [location]);

  useEffect(() => {
    const skip = currentPage * itemsPerPage - itemsPerPage;
    setSkipCount(skip);

    if (!!selectedCategory) {
      getProductsByCategory(
        selectedCategory,
        itemsPerPage,
        skipCount,
        sortingOptions[sortOptIndex]?.value ?? null
      ).then((response) => {
        setProducts(response.products);
        setFetchedCount(response.limit);
        setItemsCount(response.total);
        setIsLoading(false);
      });
    } else {
      getProducts(
        itemsPerPage,
        skipCount,
        sortingOptions[sortOptIndex]?.value ?? null
      ).then((response) => {
        setProducts(response.products);
        setFetchedCount(response.limit);
        setItemsCount(response.total);
        setIsLoading(false);
      });
    }
  }, [currentPage, sortOptIndex, selectedCategory]);

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
      <Layout sidebar={true}>
        <LoadingWrapper isLoading={isLoading}>
          <div className="catalog-header" ref={scrollRef}>
            <div>
              <span className="section-title">Catalog</span>
              <span>
                Showing{" "}
                <strong>
                  {itemsCount == 0 ? "0" : skipCount + 1}-
                  {skipCount + fetchedCount}
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
