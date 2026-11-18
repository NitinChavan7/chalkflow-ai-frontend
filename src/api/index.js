import { lessonApi } from "./lesson.api";
import { tutorApi } from "./tutor.api";
import { quizApi } from "./quiz.api";
import { healthApi } from "./health.api";
export const api = {
  health: healthApi.check,
  generateLesson: lessonApi.generate,
  getLesson: lessonApi.get,
  ask: tutorApi.ask,
  generateQuiz: quizApi.generate,
  submitQuiz: quizApi.submit,
};
