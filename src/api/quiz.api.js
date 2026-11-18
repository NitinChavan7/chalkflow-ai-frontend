import { client } from "./client";
export const quizApi = {
  generate: (lessonId, count) =>
    client.post("/api/quiz/generate", { lessonId, count }),
  submit: (quizId, answers) =>
    client.post("/api/quiz/submit", { quizId, answers }),
};
