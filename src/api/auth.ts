import { PostRequest } from "@/plugins/http";

export const ApiLogin = (data: any) => PostRequest("/auth/login", data);

export const ApiRegister = (data: any) => PostRequest("/auth/register", data);
