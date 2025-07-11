import {
  DeleteRequest,
  GetRequest,
  PatchRequest,
  PostRequest,
  PutRequest,
} from "@/plugins/http";

export const ApiGetPost = () => GetRequest("/post/active");

export const ApiGetAllPost = () => GetRequest(`/post/all`);

export const APIGetPostDetails = (slug: string) =>
  GetRequest(`/post/details/${slug}`);

export const APIUpdateProduct = (id: string, data: any) =>
  PutRequest(`menu-item/update/${id}`, data);

export const APIAddBlog = (slug: string, data: any) =>
  PostRequest(`/post/create/${slug}`, data);

export const ApiDeletePost = (id: string) => DeleteRequest(`/post/${id}`);

export const ApiUpdatePost = (id: string, payload: any) =>
  PatchRequest(`/post/update/${id}`, payload);

export const APIGetRecommendedPosts = () => GetRequest("/post/recommendations");
