import { client } from "./client";
export const lessonApi = {
  generate: (topic, level) =>
    client.post("/api/lessons/generate", { topic, level }),
  get: (id) => client.get(`/api/lessons/${id}`),
};
