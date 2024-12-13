import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { IProduct } from "../../interfaces/IProduct";
import ProductCard from "../../components/productCard/ProductCard";
import { getProducts } from "../../services/ProductService";
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
  // Core stuff's
  const scrollRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { categoryParam } = useParams();
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initiate "items"
  const [items, setItems] = useState<IProduct[]>([]);

  // Initiate "currentCattegory"
  const [cattegory, setCattegory] = useState<string | null>(
    categoryParam ?? null
  );

  // Initiate "currentPage"
  const [currentPage, setCurrentPage] = useState<number>(
    (searchParams.get("page") ?? 1) as number
  );

  // Initiate "limit" and "skip"
  const [limit, setLimit] = useState<number>(12);
  const [skipCount, setSkipCount] = useState<number>(
    currentPage * limit - limit
  );

  // Initiate "sortIndex"
  const [sortIndex, setSortIndex] = useState<number>(0);

  // Initiate "totalCount" and "fetchedCount"
  const [totalCount, setTotalCount] = useState<number>(0);
  const [fetchedCount, setFetchedCount] = useState<number>(0);

  // Get category from pathname
  useEffect(() => {
    const pathname = location.pathname.split("/");
    const newCategory = pathname.length == 3 ? pathname[2] : undefined;

    if (newCategory != cattegory) {
      setCattegory(newCategory ?? null);
    }

    setCurrentPage((searchParams.get("page") ?? 1) as number);
  }, [location]);

  useLayoutEffect(() => {
    getProducts(
      cattegory,
      limit,
      skipCount,
      sortingOptions[sortIndex]?.value ?? null
    )
      .then((response) => {
        setFetchedCount(response.limit);
        setTotalCount(response.total);
        setItems(response.products);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [cattegory, skipCount, sortIndex]);

  const paginationHandler = (page: number) => {
    console.log("paginationHandler", page);
    setSkipCount(page * limit - limit);
    window.scrollTo({
      behavior: "smooth",
      top: scrollRef.current!.getBoundingClientRect().x - 60,
    });
  };

  const sortingHandler = (option: Option, index: number) => {
    setSortIndex(index);
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
                  {totalCount == 0 ? "0" : skipCount + 1}-
                  {skipCount + fetchedCount}
                </strong>{" "}
                of <strong>{totalCount}</strong> products
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
            {items.map((product) => (
              <ProductCard key={product.id} item={product} />
            ))}
          </div>
          <div className="pagination-wrapper">
            <Pagination
              itemsPerPage={limit}
              itemsCount={totalCount}
              currentPage={currentPage}
              span={3}
              onChange={paginationHandler}
            />
          </div>
        </LoadingWrapper>
      </Layout>
    </>
  );
};

export default Catalog;
