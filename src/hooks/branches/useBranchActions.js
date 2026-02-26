import { useState, useCallback, useRef } from "react";
import {
  createBranch,
  updateBranch,
  deleteBranch,
  toggleBranchStatus,
} from "../../api/branches/branchesApi";

// Internal debounce to prevent repeated toggles
const useDebounce = (fn, delay = 400) => {
  const timerRef = useRef(null);

  return useCallback(
    (...args) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => fn(...args), delay);
    },
    [fn, delay],
  );
};

/**
 * Manages CRUD + toggle with:
 * - Optimistic update for toggle
 * - Automatic rollback on API failure
 * @param {Function} setBranches - setter from the parent
 * @param {Function} onSuccess   - called after every successful operation (to close modal)
 */
const useBranchActions = (refetch, onSuccess, setBranches) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //Create
  const handleCreate = async (dto) => {
    setLoading(true);
    try {
      await createBranch(dto);
      onSuccess?.(); // ← closes the modal
      refetch(); // ← re-fetch the list from the server
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, dto) => {
    setLoading(true);
    try {
      await updateBranch(id, dto);
      onSuccess?.();
      refetch();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleteBranch(id);
      onSuccess?.();
      refetch();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  // ── Toggle — Optimistic + Rollback ────────────────────────────────────────
  const _toggleImmediate = useCallback(
    async (branch) => {
      // 1. Optimistic update — the UI responds immediately

      setBranches((prev) =>
        prev.map((b) =>
          b.id === branch.id ? { ...b, isActive: !b.isActive } : b,
        ),
      );
      try {
        // 2. Server request

        await toggleBranchStatus(branch.id, !branch.isActive);
      } catch (err) {
        // 3. Rollback on failure

        setBranches((prev) =>
          prev.map((b) =>
            b.id === branch.id ? { ...b, isActive: branch.isActive } : b,
          ),
        );
        setError(err);
      }
    },
    [setBranches],
  );

  const handleToggle = useDebounce(_toggleImmediate, 400);

  return {
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
    handleToggle,
  };
};

export default useBranchActions;
