import { GetRequest } from "@/plugins/http";

export const ApiGetTag = () => GetRequest("/tags/active");
