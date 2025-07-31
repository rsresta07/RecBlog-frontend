import { GetRequest, PatchRequest, PutRequest } from "@/plugins/http";

export const ApiGetUser = (slug: any) => GetRequest(`/user/details/${slug}`);

export const ApiGetMe = () => GetRequest("/user/me", { withCredentials: true });

export const ApiGetAllUsers = () => GetRequest("/user/all");

/**
 * Updates the current user's profile information.
 *
 * Sends a PUT request to update the user's profile with the provided
 * data payload.
 *
 * @param {object} payload - The data to update the user's profile with.
 * @returns {Promise<AxiosResponse<void>>} A promise that resolves when the profile
 * update is successful.
 *
 * @note This endpoint requires authentication.
 */
export const ApiUpdateMe = (payload: any) =>
  PutRequest("/user/me", payload, { withCredentials: true });

/**
 * Fetches the current user's preferences.
 *
 * Sends a GET request to the user endpoint to retrieve the user's
 * preferences (i.e. the tags they are interested in).
 *
 * @returns {Promise<AxiosResponse<UserPreferences>>}
 *
 * @note This endpoint requires authentication.
 */
export const ApiGetPreferences = () =>
  GetRequest("/user/preferences", { withCredentials: true });

/**
 * Updates the current user's preferences.
 *
 * Sends a PATCH request to update the user's preferences with the provided
 * array of tag IDs.
 *
 * @param {Array<string>} tagIds - The IDs of the tags to set as the user's preferences.
 * @returns {Promise<AxiosResponse<void>>} A promise that resolves when the preferences
 * update is successful.
 *
 * @note This endpoint requires authentication.
 */
export const ApiUpdatePreferences = (tagIds: any) =>
  PatchRequest("/user/preferences", { tagIds }, { withCredentials: true });

export const ApiUpdateUserByAdmin = (slug: string, payload: any) =>
  PatchRequest(`/user/update-by-admin/${slug}`, payload, {
    withCredentials: true,
  });

export const ApiToggleUserStatus = (username: string) =>
  PatchRequest(
    `/user/status-by-admin/${username}`,
    {},
    {
      withCredentials: true,
    },
  );
