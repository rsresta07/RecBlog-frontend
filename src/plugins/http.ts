/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "@/config/axios";

/**
 * Send a GET request to the specified URL.
 * @param {string} url URL to query
 * @param {object} [config={}] Axios request config
 * @returns {Promise<AxiosResponse<any>>} Axios response
 */
export const GetRequest = (url: string, config: {} = {}) => {
  return axios.get(url, config);
};

/**
 * Send a POST request to the specified URL with the given parameters.
 *
 * @param {string} url
 *   The URL to which the POST request is sent.
 * @param {object} params
 *   The parameters to be included in the POST request body.
 * @param {object} [config={}]
 *   Optional Axios request configuration.
 * @returns {Promise<AxiosResponse<any>>}
 *   A promise resolving to the Axios response.
 */
export const PostRequest = (url: string, params: {}, config = {}) => {
  return axios.post(url, params, config);
};

/**
 * Send a PUT request to the specified URL with the given parameters.
 *
 * @param {string} url
 *   The URL to which the PUT request is sent.
 * @param {object} params
 *   The parameters to be included in the PUT request body.
 * @param {object} [config={}]
 *   Optional Axios request configuration.
 * @returns {Promise<AxiosResponse<any>>}
 *   A promise resolving to the Axios response.
 *
 * @note This function is intended for update operations, not for creating new resources.
 */
export const PutRequest = (url: string, params: {}, config = {}) => {
  //only for update not post
  return axios.put(url, params, config);
};

/**
 * Send a DELETE request to the specified URL.
 *
 * @param {string} url
 *   The URL to which the DELETE request is sent.
 * @param {object} [data={}]
 *   Optional data to be sent as the request body.
 *   This is likely to be used for deleting a resource which requires a JSON
 *   payload (i.e. the resource ID).
 * @returns {Promise<AxiosResponse<any>>}
 *   A promise resolving to the Axios response.
 */
export const DeleteRequest = (url: string, data?: any) => {
  return axios.delete(url, { data });
};

/**
 * Send a PATCH request to the specified URL with the given parameters.
 *
 * @param {string} url
 *   The URL to which the PATCH request is sent.
 * @param {object} data
 *   The parameters to be included in the PATCH request body.
 * @param {object} [config={}]
 *   Optional Axios request configuration.
 * @returns {Promise<AxiosResponse<any>>}
 *   A promise resolving to the Axios response.
 *
 * @note This function is intended for partial update operations, not for creating new resources.
 */
export const PatchRequest = (url: string, data: any, config = {}) => {
  return axios.patch(url, data, config);
};
