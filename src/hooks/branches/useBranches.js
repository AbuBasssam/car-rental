import { useCallback } from "react";
import useBranchFilters from "./useBranchFilters";
import useBranchModals from "./useBranchModals";
import useBranchActions from "./useBranchActions";

const useBranches = () => {
  const modals = useBranchModals();

  const {
    branches,
    loading: pageLoading,
    error,
    filters,
    setFilter,
    clearFilters,
    hasFilters,
    refetch,
    safePage,
    pageNumbers,
    totalPages,
    stats,
  } = useBranchFilters();

  // Actions: receives refetch so the list is reloaded after CRUD operations.
  // Pass modals.close to automatically close modals on success.
  const actions = useBranchActions(refetch, modals.close);

  // ── Action wrappers ───────────────────────────────────────────────────────
  // Wrap action handlers so they can be passed directly to UI components.
  const onSubmitCreate = useCallback(
    (dto) => {
      actions.handleCreate(dto);
    },
    [actions],
  );

  // Update handler: requires an open modal with a branch; forwards id + DTO.
  const onSubmitUpdate = useCallback(
    (dto) => {
      if (!modals.modal.branch) return;
      actions.handleUpdate(modals.modal.branch.id, dto);
    },
    [actions, modals.modal.branch],
  );

  // Delete confirmation handler: forwards id to delete action.

  const onConfirmDelete = useCallback(
    (id) => {
      actions.handleDelete(id);
    },
    [actions],
  );

  return {
    // Data
    branches,
    pageLoading,
    actionLoading: actions.loading,
    error,

    // Filters & Pagination
    filters,
    setFilter,
    clearFilters,
    hasFilters,
    safePage,
    pageNumbers,
    totalPages,
    stats,

    // Modals
    modal: modals.modal,
    openView: modals.openView,
    openCreate: modals.openCreate,
    openEdit: modals.openEdit,
    openDelete: modals.openDelete,
    closeModal: modals.close,

    // Actions
    onSubmitCreate,
    onSubmitUpdate,
    onConfirmDelete,
    handleToggle: actions.handleToggle,
  };
};

export default useBranches;
