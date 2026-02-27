import { getPaginationResponse } from "../../utils/helpers";
import axiosInstance from "../axiosInstance";
import { BRANCH_ENDPOINTS } from "../endpoints/endpoints";

/**
 * Fetch paginated + filtered branches from server
 * @param {{ page: number, pageSize: number, city?: string, status?: "all"|"active"|"inactive" }} params
 * @returns {Promise<{ data: Branch[], totalCount: number }>}
 */
export const fetchBranches = async ({
  page,
  pageSize,
  city,
  status,
  signal,
}) => {
  const params = { pageNumber: page, pageSize };

  if (city && city.trim().length >= 3) {
    params.city = city.trim();
  }

  if (status && status !== "all") {
    params.isActive = status === "active";
  }

  const response = await axiosInstance.get(BRANCH_ENDPOINTS.QUERY, {
    params,
    signal,
  });
  return getPaginationResponse(response);
};

/**
 * Fetch single branch by ID
 * @param {number} id
 * @returns {Promise<Branch>}
 */
export const fetchBranchById = async (id) => {
  const response = await axiosInstance.get(BRANCH_ENDPOINTS.GET_BY_ID(id));
  return response.data.data;
};

/**
 * Create a new branch
 * @param {{ nameEN, nameAR, cityEN, cityAR, latitude, longitude }} dto
 * @returns {Promise<number>} New branch ID
 */
export const createBranch = async (dto) => {
  const response = await axiosInstance.post(BRANCH_ENDPOINTS.CREATE, dto);
  return response.data.data; // returns new ID
};

/**
 * Update an existing branch
 * @param {number} id
 * @param {{ nameEN, nameAR, cityEN, cityAR, latitude, longitude }} dto
 * @returns {Promise<void>}
 */
export const updateBranch = async (id, dto) => {
  await axiosInstance.put(BRANCH_ENDPOINTS.UPDATE(id), dto);
};

/**
 * Delete a branch (fails server-side if branch has cars)
 * @param {number} id
 * @returns {Promise<void>}
 */
export const deleteBranch = async (id) => {
  await axiosInstance.delete(BRANCH_ENDPOINTS.DELETE(id));
};

/**
 * Toggle branch active status
 * @param {number} id
 * @param {bool} activeStatus
 * @returns {Promise<boolean>} New status
 */
export const toggleBranchStatus = async (id, activeStatus) => {
  const payload = {
    activeStatus: activeStatus,
  };
  const response = await axiosInstance.patch(
    BRANCH_ENDPOINTS.TOGGLE(id),
    payload,
  );
  return response.data.data;
};
