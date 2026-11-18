import { client } from "./client";
export const healthApi = { check: () => client.get("/api/health") };
