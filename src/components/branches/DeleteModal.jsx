import React from "react";
import { branchesPageStyles as s } from "../../utils/styles";
import { AlertTriangle, Loader2 } from "lucide-react";

/**
 * Delete Confirm Modal

 * @param {*} param0 
 * @returns 
 */
const DeleteModal = ({ branch, onClose, onConfirm, loading }) => {
  if (!branch) return null;
  const hasCars = branch.carsCount > 0;
  return (
    <div className={s.overlay} onClick={onClose}>
      <div
        className={s.deleteModal.wrapper}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={s.deleteModal.header}>
          <div className={s.deleteModal.iconWrapper}>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className={s.deleteModal.title}>Delete Branch</h2>
          {hasCars ? (
            <p className={s.deleteModal.desc}>
              Cannot delete{" "}
              <span className={s.deleteModal.branchName}>{branch.nameEN}</span>{" "}
              because it has{" "}
              <span className="font-semibold text-red-500">
                {branch.carsCount} cars
              </span>{" "}
              assigned to it. Reassign or remove cars first.
            </p>
          ) : (
            <p className={s.deleteModal.desc}>
              Are you sure you want to delete{" "}
              <span className={s.deleteModal.branchName}>{branch.nameEN}</span>?
              This action cannot be undone.
            </p>
          )}
        </div>
        <div className={s.deleteModal.footer}>
          <button className={s.deleteModal.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={s.deleteModal.deleteBtn}
            onClick={() => onConfirm(branch.id)}
            disabled={loading || hasCars}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {hasCars ? "Cannot Delete" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeleteModal;
