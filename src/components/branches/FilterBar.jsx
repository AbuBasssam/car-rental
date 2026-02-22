import { branchesPageStyles as s } from "../../utils/styles.js";
import { Search, X } from "lucide-react";
/*
const FilterBar = () => {
  const [searchCity, setSearchCity] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pageSize, setPageSize] = useState(6);

  const clearFilters = () => {
    setSearchCity("");
    setStatusFilter("all");
  };
  const hasFilters = searchCity !== "" || statusFilter !== "all";
  const PAGE_SIZE_OPTIONS = [6, 9, 12];

  return (
    <section className={s.filterBar.wrapper} aria-label="BranchFilters">
      <form
        className="flex flex-wrap items-center gap-4 w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={s.filterBar.searchWrapper}>
          <label htmlFor="city-search" className="sr-only">
            Search by city
          </label>
          <Search className={s.filterBar.searchIcon} />
          <input
            id="city-search"
            type="search"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search by city..."
            className={s.filterBar.searchInput}
          />
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="status-filter"
            className="text-sm font-medium text-gray-600"
          >
            Status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={s.filterBar.select}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label
            htmlFor="page-size"
            className="text-sm font-medium text-gray-600"
          >
            Show:
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className={s.filterBar.select}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} per page
              </option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button
            type="button" // تأكد من أنه button وليس submit
            className={s.filterBar.clearBtn}
            onClick={clearFilters}
          >
            <X className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </form>
    </section>
  );
};
*/
const PAGE_SIZE_OPTIONS = [6, 9, 12];

const FilterBar = ({
  searchCity,
  setSearchCity,
  statusFilter,
  setStatusFilter,
  pageSize,
  setPageSize,
  clearFilters,
  hasFilters,
}) => {
  return (
    <section className={s.filterBar.wrapper} aria-label="Table Filters">
      <form
        className="flex flex-wrap items-center gap-4 w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Search By City Field */}
        <div className={s.filterBar.searchWrapper}>
          <label htmlFor="city-search" className="sr-only">
            Search by city
          </label>
          <Search className={s.filterBar.searchIcon} />
          <input
            id="city-search"
            type="search"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search by city..."
            className={s.filterBar.searchInput}
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="status-filter"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Status:
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={s.filterBar.select}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center gap-2">
          <label
            htmlFor="page-size"
            className="text-sm font-medium text-gray-600 dark:text-gray-300"
          >
            Show:
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className={s.filterBar.select}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n} per page
              </option>
            ))}
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasFilters && (
          <button
            type="button"
            className={s.filterBar.clearBtn}
            onClick={clearFilters}
            aria-label="Reset all filters"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </button>
        )}
      </form>
    </section>
  );
};

export default FilterBar;
