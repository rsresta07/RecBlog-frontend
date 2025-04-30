import { PostRequest } from "@/plugins/http";

// ! YOU HAVE TO CHANGE THE API URL BRUHHH
export const ApiLogin = (data: any) => PostRequest("/api/v1/auth/login", data);
