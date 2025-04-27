import { GetRequest } from "@/plugins/http";

export const ApiGetPost = () => GetRequest("/post/active");

export const ApiGetAllPost = () =>
  GetRequest(`/post/all`);

export const APIGetPostDetails = (slug: any) =>
  GetRequest(`/post/${slug}`);
