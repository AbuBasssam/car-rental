import { keys } from "./constants";
export const getAppLanguage = () =>
  localStorage.getItem(keys.kLanguage) ?? keys.kEN;
/**
 * Transforms an error object with parameters into a localized string.
 * Supports param1 as a translation key (for field names) or a raw value.
 */
export const getErrorMessage = (errorObj, t) => {
  if (!errorObj) return null;
  if (typeof errorObj === "string") return errorObj.split(",")[0];

  const { key, params } = errorObj;
  if (!params) return t(key);

  // Normalizing parameter naming (supporting both 'param' and 'parm')
  const p1 = params.param1 || params.parm1;
  const p2 = params.param2 || params.parm2;

  const interpolationData = {
    // Translate p1 if it represents a field key, otherwise use as raw value
    param1: typeof p1 === "string" ? t(p1) : p1,
    ...(p2 !== undefined && { param2: p2 }),
  };

  return t(key, interpolationData);
};

/**
 * Transforms a raw API response into a structured pagination object.
 * * @param {Object} response - The full Axios or fetch response object.
 * @param {Object} response.data - The main response body.
 * @param {boolean} response.data.success - Indicates if the API request was successful.
 * @param {Object} response.data.data - The paginated data wrapper.
 * @param {number} response.data.data.currentPage - The current page index.
 * @param {boolean} response.data.data.hasPreviousPage - Whether a previous page exists.
 * @param {boolean} response.data.data.hasNextPage - Whether a next page exists.
 * @param {number} response.data.data.totalPages - Total number of available pages.
 * @param {number} response.data.data.totalCount - Total number of records across all pages.
 * @param {Array} response.data.data.data - The actual list of branch records.
 * @throws {Error} Throws an error if the response format does not match the expected pagination structure.
 * @returns {Object} A formatted object containing success status, nested paginationInfo, and the branches array.
 */
export const getPaginationResponse = function (response) {
  const isPaginated =
    response?.data?.data?.succeeded &&
    response?.data?.data?.data &&
    "totalPages" in response.data.data;

  if (!isPaginated) {
    throw new Error(
      `[Pagination Error]: Invalid response format. Expected paginated data structure, but received: ${JSON.stringify(response?.data)}`,
    );
  }

  const pagedData = response.data.data;

  return {
    success: response.data.success,
    paginationInfo: {
      currentPage: pagedData.currentPage,
      hasPrevPage: pagedData.hasPreviousPage,
      hasNextPage: pagedData.hasNextPage,
      totalPages: pagedData.totalPages,
      totalCount: pagedData.totalCount,
    },
    branches: pagedData.data,
  };
};
