import { DeleteRequest, GetRequest, PostRequest } from "@/plugins/http";

export const ApiGetTag = () => GetRequest("/tags/active");

export const ApiGetAllTags = () => GetRequest("/tags/all");

export const ApiAddTag = (data: any) => PostRequest("/tags/create", data);

export const ApiDeleteTag = (id: string) => DeleteRequest(`/tags/delete/${id}`);
