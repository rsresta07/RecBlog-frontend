import { GetRequest } from "@/plugins/http";
import axios from "axios";

export const ApiGetUser = (slug: any) => GetRequest(`/user/details/${slug}`);

export const ApiGetMe = () => GetRequest("/user/me", { withCredentials: true });
