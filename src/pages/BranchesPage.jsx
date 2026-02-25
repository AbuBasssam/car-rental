import Navbar from "../components/Navbar/adminNavbar/AdminNavbar";
import { branchesPageStyles as s } from "../utils/styles";
import { branchFilters as f, formModes } from "../utils/constants";

import useBranches from "../hooks/branches/useBranches";
import PageHeader from "../components/branches/Header";
import BranchCard from "../components/branches/BranchCard";
import SkeletonPage from "../components/branches/SkeletonPage";
import EmptyState from "../components/branches/EmptyState";
import StatsSection from "../components/branches/StatsSection";
import FilterBar from "../components/branches/FilterBar";
import Pagination from "../layouts/Pagination";
import ViewModal from "../components/branches/ViewModal";
import FormModal from "../components/branches/FormModal";
import DeleteModal from "../components/branches/DeleteModal";

const BranchesPage = () => {
  const {
    pageLoading,
    actionLoading,
    filters,
    setFilter,
    clearFilters,
    hasFilters,
    branches,
    totalPages,
    safePage,
    pageNumbers,
    stats,
    modal,
    openView,
    openCreate,
    openEdit,
    openDelete,
    closeModal,
    onSubmitCreate,
    onSubmitUpdate,
    onConfirmDelete,
    handleToggle,
  } = useBranches();

  return (
    <>
      <Navbar />
      <main className={s.page}>
        <div className={s.container}>
          {pageLoading ? (
            <SkeletonPage count={filters.pageSize} />
          ) : (
            <>
              <PageHeader addAction={openCreate} />
              <StatsSection stats={stats} />

              <FilterBar
                searchCity={filters.searchCity}
                setSearchCity={(v) => setFilter(f.city, v)}
                statusFilter={filters.statusFilter}
                setStatusFilter={(v) => setFilter(f.status, v)}
                pageSize={filters.pageSize}
                setPageSize={(v) => setFilter(f.pageSize, v)}
                clearFilters={clearFilters}
                hasFilters={hasFilters}
              >
                <FilterBar.CitySearch />
                <FilterBar.StatusSelect />
                <FilterBar.PageSizeSelect />
                <FilterBar.ClearButton />
              </FilterBar>

              {/* Branch Grid */}
              <section aria-label="Branches list" aria-live="polite">
                {branches.length === 0 ? (
                  <EmptyState onClear={hasFilters ? clearFilters : null} />
                ) : (
                  <div className={s.grid}>
                    {branches.map((branch) => (
                      <BranchCard key={branch.id} branch={branch}>
                        <BranchCard.Header />
                        <BranchCard.Body />
                        <BranchCard.Actions
                          onView={openView}
                          onEdit={openEdit}
                          onDelete={openDelete}
                          onToggle={handleToggle}
                        />
                      </BranchCard>
                    ))}
                  </div>
                )}
              </section>

              <Pagination
                currentPage={safePage}
                totalPages={totalPages}
                pageSize={filters.pageSize}
                totalItems={stats.total}
                onPageChange={(p) => setFilter(f.page, p)}
                pageNumbers={pageNumbers}
              />
            </>
          )}
        </div>
      </main>

      {modal.type === formModes.view && (
        <ViewModal
          branch={modal.branch}
          onClose={closeModal}
          onEdit={openEdit}
        />
      )}

      {(modal.type === formModes.create || modal.type === formModes.edit) && (
        <FormModal
          mode={
            modal.type === formModes.edit ? formModes.edit : formModes.create
          }
          branch={modal.branch}
          onClose={closeModal}
          onSubmit={
            modal.type === formModes.edit ? onSubmitUpdate : onSubmitCreate
          }
          loading={actionLoading}
        />
      )}

      {modal.type === formModes.delete && (
        <DeleteModal
          branch={modal.branch}
          onClose={closeModal}
          onConfirm={onConfirmDelete}
          loading={actionLoading}
        />
      )}
    </>
  );
};

export default BranchesPage;
