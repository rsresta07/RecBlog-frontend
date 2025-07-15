import { GetRequest } from "@/plugins/http";

export const APIGetRecommendedPosts = () =>
  GetRequest("/recommendation-service/recommendations");

export const APIGetRawRecommendedPosts = () =>
  GetRequest("/recommendation-service/raw-recommendations");

export const APIUserRecommendedPosts = () =>
  GetRequest("/recommendation-service/user-based-recommendations");

export const APIInteractionRecommendedPosts = () =>
  GetRequest("/recommendation-service/interaction-based-recommendations");

export const APIFinalRecommendedPosts = () =>
  GetRequest("/recommendation-service/final-recommendations");
