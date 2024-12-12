import { FC } from "react";
import { Link } from "react-router-dom";
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
    let page: number = currentPage - span > 0 ? currentPage - span : 1;
    page <= (currentPage + span > totalPages ? totalPages : currentPage + span);
    page++
  ) {
    pages.push(page);
  }
  return pages;
};

const Pagination: FC<PaginationProps> = ({
  itemsPerPage,
  itemsCount,
  currentPage,
  span,
}) => {
  const totalPages = Math.ceil(itemsCount / itemsPerPage);
  const pages = generatePages(currentPage, totalPages, span);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="pagination">
      {prevPage > 0 && (
        <Link
          className="pagination-item"
          to={{
            search: `?page=${prevPage}`,
          }}
        >
          <FontAwesomeIcon icon={faCaretLeft} />
        </Link>
      )}

      {pages.map((page) => {
        return (
          <Link
            key={page}
            className={`pagination-item ${
              currentPage == page ? "active" : undefined
            }`}
            to={{
              search: `?page=${page}`,
            }}
          >
            {page}
          </Link>
        );
      })}

      {nextPage < totalPages && (
        <Link
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
