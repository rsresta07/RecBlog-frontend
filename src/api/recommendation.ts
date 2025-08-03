import { GetRequest } from "@/plugins/http";

/**
 * Fetches recommended posts for the user.
 *
 * Sends a GET request to the recommendation service to retrieve
 * a list of recommended posts based on the user's preferences and
 * interactions.
 *
 * @returns {Promise} A promise that resolves to the response of the GET request.
 */
export const APIGetRecommendedPosts = () =>
  GetRequest("/recommendation-service/recommendations");

/**
 * Fetches the raw recommended posts for the user from the recommendation service.
 *
 * Note: This endpoint returns the raw recommendations from the recommendation
 * service, without any additional processing or filtering.
 *
 * @returns {Promise} A promise that resolves to the response of the GET request.
 */
export const APIGetRawRecommendedPosts = () =>
  GetRequest("/recommendation-service/raw-recommendations");

/**
 * Fetches recommended posts for the user using the user-based collaborative
 * filtering algorithm.
 *
 * Sends a GET request to the recommendation service to retrieve
 * a list of recommended posts based on the user's preferences and
 * interactions.
 *
 * @returns {Promise} A promise that resolves to the response of the GET request.
 */
export const APIUserRecommendedPosts = () =>
  GetRequest("/recommendation-service/user-based-recommendations");

/**
 * Fetches recommended posts for the user using the interaction-based
 * collaborative filtering algorithm.
 *
 * Sends a GET request to the recommendation service to retrieve
 * a list of recommended posts based on the user's interactions with
 * other users.
 *
 * @returns {Promise} A promise that resolves to the response of the GET request.
 */
export const APIInteractionRecommendedPosts = () =>
  GetRequest("/recommendation-service/interaction-based-recommendations");

/**
 * Fetches the final recommended posts for the user, after combining the
 * user-based and interaction-based recommendations.
 *
 * Sends a GET request to the recommendation service to retrieve
 * a list of recommended posts based on the combined scores of the
 * user-based and interaction-based recommendation algorithms.
 *
 * @returns {Promise} A promise that resolves to the response of the GET request.
 */
export const APIFinalRecommendedPosts = () =>
  GetRequest("/recommendation-service/final-recommendations");

export const APIGetPostContextRecommendations = (postId: string) =>
  GetRequest(`/recommendation-service/post-context-recommendations/${postId}`);
