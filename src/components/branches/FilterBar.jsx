import { createContext, useContext } from "react";
import { flexRow, branchesPageStyles as s } from "../../utils/styles.js";
import {
  localeKeys as ltk,
  branchFilterBarKeys as tk,
} from "../../utils/localeKeys";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";

const PAGE_SIZE_OPTIONS = [6, 9, 12];

const FilterContext = createContext(null);

/**
 * Returns the nearest FilterBar context value.
 * @throws {Error} When used outside a FilterBar root
 * @returns {{ searchCity, setSearchCity, statusFilter, setStatusFilter, pageSize, setPageSize, clearFilters, hasFilters }}
 */
const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx)
    throw new Error("FilterBar sub-components must be used inside <FilterBar>");
  return ctx;
};

// Sub-Components

/**
 * Text input that filters branches by city name.
 */
const CitySearch = () => {
  const { searchCity, setSearchCity } = useFilterContext();
  const { t } = useTranslation();

  return (
    <div className={s.filterBar.searchWrapper}>
      <label htmlFor="city-search" className="sr-only">
        {t(tk.filterSearchLabel)}
      </label>
      <Search className={s.filterBar.searchIcon} />
      <input
        id="city-search"
        type="search"
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        placeholder={t(tk.searchPlaceholder)}
        className={s.filterBar.searchInput}
      />
    </div>
  );
};

/**
 * Dropdown to filter branches by active / inactive status.
 */
const StatusSelect = () => {
  const { statusFilter, setStatusFilter } = useFilterContext();
  const { t } = useTranslation();

  return (
    <div className={flexRow}>
      <label
        htmlFor="status-filter"
        className="text-sm font-medium text-gray-600 dark:text-gray-300"
      >
        {t(tk.statusLabel)}:
      </label>
      <select
        id="status-filter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className={s.filterBar.select}
      >
        <option value="all">{t(tk.statusAll)}</option>
        <option value="active">{t(tk.statusActive)}</option>
        <option value="inactive">{t(tk.statusInactive)}</option>
      </select>
    </div>
  );
};

/**
 * Dropdown to control how many branches are shown per page.
 */
const PageSizeSelect = () => {
  const { pageSize, setPageSize } = useFilterContext();
  const { t } = useTranslation();

  return (
    <div className={flexRow}>
      <label
        htmlFor="page-size"
        className="text-sm font-medium text-gray-600 dark:text-gray-300"
      >
        {t(tk.filterShowLabel)}:
      </label>
      <select
        id="page-size"
        value={pageSize}
        onChange={(e) => setPageSize(Number(e.target.value))}
        className={s.filterBar.select}
      >
        {PAGE_SIZE_OPTIONS.map((n) => (
          <option key={n} value={n}>
            {t(tk.perPage, { count: n })}
          </option>
        ))}
      </select>
    </div>
  );
};

/**
 * Button that resets all active filters.
 * Renders only when at least one filter is applied.
 */
const ClearButton = () => {
  const { hasFilters, clearFilters } = useFilterContext();
  const { t } = useTranslation();

  if (!hasFilters) return null;

  return (
    <button
      type="button"
      className={s.filterBar.clearBtn}
      onClick={clearFilters}
      aria-label={t(ltk.clear)}
    >
      {t(ltk.clear)}
    </button>
  );
};

// ─── Root Component ───────────────────────────────────────────────────────────

/**
 * Filter bar compound component.
 * Provides filter state to all sub-components via internal context — no prop drilling.
 *
 * @example
 * <FilterBar searchCity={...} setSearchCity={...} ...>
 *   <FilterBar.CitySearch />
 *   <FilterBar.StatusSelect />
 *   <FilterBar.PageSizeSelect />
 *   <FilterBar.ClearButton />
 * </FilterBar>
 *
 * @param {{
 *   searchCity:      string,
 *   setSearchCity:   Function,
 *   statusFilter:    string,
 *   setStatusFilter: Function,
 *   pageSize:        number,
 *   setPageSize:     Function,
 *   clearFilters:    Function,
 *   hasFilters:      boolean,
 *   children:        React.ReactNode
 * }} props
 */
const FilterBar = ({
  searchCity,
  setSearchCity,
  statusFilter,
  setStatusFilter,
  pageSize,
  setPageSize,
  clearFilters,
  hasFilters,
  children,
}) => (
  <FilterContext.Provider
    value={{
      searchCity,
      setSearchCity,
      statusFilter,
      setStatusFilter,
      pageSize,
      setPageSize,
      clearFilters,
      hasFilters,
    }}
  >
    <section className={s.filterBar.wrapper} aria-label="Table Filters">
      <form
        className="flex flex-wrap items-center gap-4 w-full"
        onSubmit={(e) => e.preventDefault()}
      >
        {children}
      </form>
    </section>
  </FilterContext.Provider>
);

FilterBar.CitySearch = CitySearch;
FilterBar.StatusSelect = StatusSelect;
FilterBar.PageSizeSelect = PageSizeSelect;
FilterBar.ClearButton = ClearButton;

export default FilterBar;
