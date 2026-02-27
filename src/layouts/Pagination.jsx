import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { branchesPageStyles as s } from "../utils/styles.js";
import { useTranslation } from "react-i18next";
import { branchPaginationKeys as tk } from "../utils/localeKeys.js";
const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalItems,
  currentCount,
  onPageChange,
  pageNumbers,
}) => {
  const { t } = useTranslation();
  const startRange = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRange = startRange + currentCount - 1;

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination Navigation" className={s.pagination.wrapper}>
      <p className={s.pagination.info}>
        {t(tk.info, {
          start: startRange,
          end: endRange,
          total: totalItems,
        })}
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

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((p, i) => (
            <React.Fragment key={`page-wrapper-${p}`}>
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
