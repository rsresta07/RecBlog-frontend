import { GetRequest, PatchRequest } from "@/plugins/http";

export const ApiGetUser = (slug: any) => GetRequest(`/user/details/${slug}`);

export const ApiGetMe = () => GetRequest("/user/me", { withCredentials: true });

export const ApiGetAllUsers = () => GetRequest("/user/all");

export const ApiUpdateMe = (payload: any) =>
  PatchRequest("/user/me", payload, { withCredentials: true });

export const ApiGetPreferences = () =>
  GetRequest("/user/preferences", { withCredentials: true });
export const ApiUpdatePreferences = (tagIds: any) =>
  PatchRequest("/user/preferences", { tagIds }, { withCredentials: true });
