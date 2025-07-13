import { GetRequest } from "@/plugins/http";

export const APIGetRecommendedPosts = () =>
  GetRequest("/recommendation-service/recommendations");

export const APIGetRawRecommendedPosts = () =>
  GetRequest("/recommendation-service/raw-recommendations");
