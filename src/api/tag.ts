import { GetRequest, PatchRequest, PostRequest } from "@/plugins/http";

export const ApiGetTag = () => GetRequest("/tags/active");

export const ApiGetAllTags = () => GetRequest("/tags/all");

export const ApiAddTag = (data: any) => PostRequest("/tags/create", data);

export const ApiToggleTagStatus = (id: string) =>
  PatchRequest(`/tags/delete/${id}`, {}); // ← empty body fixes TS2554

export const ApiEditTag = (id: string, data: any) =>
  PatchRequest(`/tags/update/${id}`, data);
