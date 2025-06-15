import { GetRequest } from "@/plugins/http";
import axios from "axios";

export const ApiGetUser = (slug: any) => GetRequest(`/user/details/${slug}`);

export const ApiGetMe = () =>
  axios.get("/user/me", { withCredentials: true }).then((res) => res.data);
