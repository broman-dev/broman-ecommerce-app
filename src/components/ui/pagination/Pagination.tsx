import { FC, useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import "./Pagination.scss";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type PaginationProps = {
  itemsPerPage: number;
  itemsCount: number;
  currentPage: number;
  span: number | null;
  onChange: (currentPage: number) => void;
};

const generatePages = (
  currentPage: number,
  totalPages: number,
  span: number | null
) => {
  span ??= 4;

  let pages: number[] = [];
  for (
    let page: number = currentPage - span >= 1 ? currentPage - span : 1;
    page <= (currentPage + span < totalPages ? currentPage + span : totalPages);
    page++
  ) {
    pages.push(page);
  }
  return pages;
};

const Pagination: FC<PaginationProps> = ({
  itemsPerPage,
  itemsCount,
  span,
  onChange,
}) => {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    (searchParams.get("page") ?? 1) as number
  );
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(itemsCount / itemsPerPage)
  );

  const [pages, setPages] = useState<number[]>(
    generatePages(page, totalPages, span)
  );

  const prevPage = page - 1;
  const nextPage = prevPage + 2;

  useEffect(() => {
    const paramPage = (searchParams.get("page") ?? 1) as number;
    setPage(paramPage);
  }, [location]);

  useEffect(() => {
    setTotalPages(Math.ceil(itemsCount / itemsPerPage));
  }, [itemsCount, itemsPerPage]);

  useEffect(() => {
    setPages(generatePages(page, totalPages, span));
    console.log("onChange call ", page);
    onChange(page);
  }, [page, totalPages, itemsCount]);

  return (
    <div className="pagination">
      {prevPage >= 1 && (
        <Link
          onClick={() => {
            setPage(prevPage);
          }}
          className="pagination-item"
          to={{
            search: `?page=${prevPage}`,
          }}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </Link>
      )}

      {pages.map((pageNumber) => {
        return (
          <Link
            onClick={() => {
              setPage(pageNumber);
            }}
            key={pageNumber}
            className={`pagination-item ${
              page == pageNumber ? "active" : undefined
            }`}
            to={{
              search: `?page=${pageNumber}`,
            }}
          >
            {pageNumber}
          </Link>
        );
      })}

      {nextPage <= totalPages && (
        <Link
          onClick={() => {
            setPage(nextPage);
          }}
          className="pagination-item"
          to={{
            search: `?page=${nextPage}`,
          }}
        >
          <FontAwesomeIcon icon={faCaretRight} />
        </Link>
      )}
    </div>
  );
};

export default Pagination;
