import { client } from "./client";
export const tutorApi = {
  ask: (lessonId, question, conversationId) =>
    client.post("/api/tutor/ask", { lessonId, question, conversationId }),
};
