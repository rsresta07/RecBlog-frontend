import {
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
} from "@/plugins/http";

export const ApiGetPost = () => GetRequest("/post/active");

export const ApiGetAllPost = () => GetRequest(`/post/all`);

/**
 * Get the details of a specific post.
 *
 * @param {string} slug - the slug of the post
 * @returns {Promise<AxiosResponse<PostDetails>>}
 */
export const APIGetPostDetails = (slug: string) =>
  GetRequest(`/post/details/${slug}`);

/**
 * Get the details of a specific post.
 *
 * @param {string} slug - the slug of the post
 * @returns {Promise<AxiosResponse<PostDetails>>}
 *
 * @note This endpoint requires authentication
 */
export const APIGetPostDetailsAuth = (slug: string) =>
  GetRequest(`/post/details-auth/${slug}`);

/**
 * Update a menu item.
 *
 * @param {string} id - the id of the menu item
 * @param {object} data - the data to be updated
 * @returns {Promise<AxiosResponse<void>>}
 *
 * @note This endpoint requires authentication
 * @note This endpoint requires the user to have the role of at least "user"
 */
export const APIUpdateProduct = (id: string, data: any) =>
  PutRequest(`menu-item/update/${id}`, data);

/**
 * Create a new blog post.
 *
 * @param {string} slug - the slug of the user who is creating the post
 * @param {object} data - the data of the post to be created
 * @returns {Promise<AxiosResponse<void>>}
 *
 * @note This endpoint requires authentication
 * @note This endpoint requires the user to have the role of at least "user"
 */
export const APIAddBlog = (slug: string, data: any) =>
  PostRequest(`/post/create/${slug}`, data);

export const ApiDeletePost = (id: string) => DeleteRequest(`/post/${id}`);

/**
 * Update a post.
 *
 * @param {string} id - the id of the post to be updated
 * @param {object} payload - the data to be updated
 * @returns {Promise<AxiosResponse<void>>}
 *
 * @note This endpoint requires authentication
 * @note This endpoint requires the user to have the role of at least "user"
 */
export const ApiUpdatePost = (id: string, payload: any) =>
  PatchRequest(`/post/update/${id}`, payload);
