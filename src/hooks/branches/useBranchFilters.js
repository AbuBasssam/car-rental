import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchBranches } from "../../api/branches/branchesApi";

const MIN_SEARCH_CHARS = 3;

const useBranchFilters = () => {
  const [branches, setBranches] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Filter State
  const [filters, setFilters] = useState({
    city: "",
    status: "all",
    pageSize: 6,
    page: 1,
  });

  useEffect(() => {
    // do not include city parameter if its length is less than MIN_SEARCH_CHARS
    if (
      filters.city.trim().length > 0 &&
      filters.city.trim().length < MIN_SEARCH_CHARS
    )
      return;

    const controller = new AbortController();

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchBranches({
          page: filters.page,
          pageSize: filters.pageSize,
          city: filters.city,
          status: filters.status,
          signal: controller.signal,
        });

        setBranches(result.branches);
        setPaginationInfo(result.paginationInfo);
        setLoading(false);
      } catch (err) {
        if (err.name === "AbortError" || err.code === "ERR_CANCELED") return;

        setError(err);
        setLoading(false);
      }
    };

    fetch();

    // ← Cleanup: abort the previous request before starting a new one
    return () => controller.abort();
  }, [filters.city, filters.status, filters.page, filters.pageSize]);

  // Setters

  const setFilter = useCallback((key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== "page" ? { page: 1 } : {}),
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters((prev) => ({ ...prev, city: "", status: "all", page: 1 }));
  }, []);

  //  Refetch — called after CRUD operations to refresh the list with current filters
  const refetch = useCallback(() => {
    // force the useEffect to re-run by making a no-op change then returning it
    // the cleaner approach: use an external key
    setFilters((prev) => ({ ...prev }));
  }, []);

  //  Derived stats
  const hasFilters = filters.city !== "" || filters.status !== "all";

  const safePage = Math.min(filters.page, paginationInfo.totalPages || 1);

  const pageNumbers = useMemo(() => {
    const total = paginationInfo.totalPages || 1;
    return Array.from({ length: total }, (_, i) => i + 1).filter(
      (p) => p === 1 || p === total || Math.abs(p - safePage) <= 1,
    );
  }, [paginationInfo.totalPages, safePage]);

  const stats = useMemo(
    () => ({
      total: paginationInfo.totalCount || 0,
      active: branches.filter((b) => b.isActive).length,
      inactive: branches.filter((b) => !b.isActive).length,
    }),
    [branches, paginationInfo.totalCount],
  );

  return {
    // Data
    branches,
    loading,
    error,
    // Filters
    filters,
    setFilter,
    clearFilters,
    hasFilters,
    refetch,

    // Pagination
    safePage,
    pageNumbers,
    totalPages: paginationInfo.totalPages || 1,

    // Stats
    stats,
  };
};

export default useBranchFilters;
