import { useReducer, useCallback } from "react";
import { formModes } from "../../utils/constants";

//Action Types
export const MODAL_ACTIONS = {
  OPEN_VIEW: "OPEN_VIEW",
  OPEN_CREATE: "OPEN_CREATE",
  OPEN_EDIT: "OPEN_EDIT",
  OPEN_DELETE: "OPEN_DELETE",
  CLOSE: "CLOSE",
};

const initialState = { type: null, branch: null };

const modalReducer = (state, action) => {
  switch (action.type) {
    case MODAL_ACTIONS.OPEN_VIEW:
      return { type: formModes.view, branch: action.branch };
    case MODAL_ACTIONS.OPEN_CREATE:
      return { type: formModes.create, branch: null };
    case MODAL_ACTIONS.OPEN_EDIT:
      return { type: formModes.edit, branch: action.branch };
    case MODAL_ACTIONS.OPEN_DELETE:
      return { type: formModes.delete, branch: action.branch };
    case MODAL_ACTIONS.CLOSE:
      return initialState;
    default:
      return state;
  }
};

const useBranchModals = () => {
  const [modal, dispatch] = useReducer(modalReducer, initialState);

  const openView = useCallback(
    (branch) => dispatch({ type: MODAL_ACTIONS.OPEN_VIEW, branch }),
    [],
  );
  const openCreate = useCallback(
    () => dispatch({ type: MODAL_ACTIONS.OPEN_CREATE }),
    [],
  );
  const openEdit = useCallback(
    (branch) => dispatch({ type: MODAL_ACTIONS.OPEN_EDIT, branch }),
    [],
  );
  const openDelete = useCallback(
    (branch) => dispatch({ type: MODAL_ACTIONS.OPEN_DELETE, branch }),
    [],
  );
  const close = useCallback(() => dispatch({ type: MODAL_ACTIONS.CLOSE }), []);

  return {
    modal,
    openView,
    openCreate,
    openEdit,
    openDelete,
    close,
  };
};

export default useBranchModals;
