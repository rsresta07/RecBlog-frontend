/**
 * Front‑end endpoints aligned with the latest Nest controllers.
 * If you change a route on the server, fix it here the same minute—no excuses.
 */
import { DeleteRequest, GetRequest, PostRequest } from "@/plugins/http";

/**
 * Follow a user.
 *
 * @param {string} userId
 *   The ID of the user to follow.
 * @returns
 *   A promise of the response.
 */
export const APIFollowUser = (userId: string) =>
  PostRequest(`/follows/${userId}`, {});

/**
 * Unfollow a user.
 *
 * @param {string} userId
 *   The ID of the user to unfollow.
 * @returns
 *   A promise of the response.
 */
export const APIUnfollowUser = (userId: string) =>
  DeleteRequest(`/follows/${userId}`);

/**
 * Check if the current user is following a specific user.
 *
 * @param {string} userId
 *   The ID of the user to check follow status for.
 * @returns
 *   A promise of the response indicating follow status.
 */
export const APIAmIFollowing = (userId: string) =>
  GetRequest(`/follows/${userId}/status`);

/**
 * Like a post.
 *
 * @param {string} postId
 *   The ID of the post to be liked.
 * @returns
 *   A promise of the response.
 */
export const APILikePost = (postId: string) =>
  PostRequest(`/post-likes/${postId}/like`, {});

/**
 * Unlike a post.
 *
 * @param {string} postId
 *   The ID of the post to be unliked.
 * @returns
 *   A promise of the response.
 */
export const APIUnlikePost = (postId: string) =>
  DeleteRequest(`/post-likes/${postId}/like`);

/**
 * Check if the current user likes a specific post.
 *
 * Sends a GET request to the server to retrieve the like status
 * for the specified post.
 *
 * @param {string} postId
 *   The ID of the post to check like status for.
 * @returns
 *   A promise of the response indicating like status.
 */
export const APIDoILike = (postId: string) =>
  GetRequest(`/post-likes/${postId}/like/status`);

/**
 * Add a comment to a post.
 *
 * @param {string} postId
 *   The ID of the post to add the comment to.
 * @param {string} content
 *   The text content of the comment to be added.
 * @returns
 *   A promise of the response.
 */
export const APIAddComment = (postId: string, content: string) =>
  PostRequest(`/posts/${postId}/comments`, { content });

/**
 * Fetches the list of comments for a specific post.
 *
 * Sends a GET request to retrieve all comments associated
 * with the given post ID.
 *
 * @param {string} postId
 *   The ID of the post for which to retrieve comments.
 * @returns
 *   A promise that resolves to the response containing the list of comments.
 */
export const APIListComments = (postId: string) =>
  GetRequest(`/posts/${postId}/comments`);
