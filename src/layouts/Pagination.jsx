import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { branchesPageStyles as s } from "../utils/styles.js";

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  onPageChange,
  pageNumbers,
}) => {
  const startRange = (currentPage - 1) * pageSize + 1;
  const endRange = Math.min(currentPage * pageSize, totalItems);

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination Navigation" className={s.pagination.wrapper}>
      <p className={s.pagination.info}>
        Showing <span className="font-medium">{startRange}</span>–
        <span className="font-medium">{endRange}</span> of{" "}
        <span className="font-medium">{totalItems}</span> branches
      </p>

      <div
        className={s.pagination.controls}
        role="group"
        aria-label="Page navigation"
      >
        {/* Previous Button */}
        <button
          className={s.pagination.navBtn(currentPage === 1)}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Go to previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* أرقام الصفحات */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((p, i) => (
            <React.Fragment key={`page-wrapper-${p}`}>
              {/* */}
              {i > 0 && pageNumbers[i - 1] !== p - 1 && (
                <span
                  className="text-light-text-subtle dark:text-dark-text-subtle px-1"
                  aria-hidden="true"
                >
                  …
                </span>
              )}

              <button
                className={s.pagination.pageBtn(p === currentPage)}
                onClick={() => onPageChange(p)}
                aria-current={p === currentPage ? "page" : undefined}
                aria-label={`Go to page ${p}`}
              >
                {p}
              </button>
            </React.Fragment>
          ))}
        </div>

        {/* Next Button*/}
        <button
          className={s.pagination.navBtn(currentPage === totalPages)}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Go to next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
