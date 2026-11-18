import axios from "axios";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  timeout: 70000,
  headers: { "Content-Type": "application/json" },
});

client.interceptors.response.use(
  (response) => response.data.data,
  (error) =>
    Promise.reject(
      new Error(
        error.response?.data?.message ||
          (error.code === "ECONNABORTED"
            ? "The request timed out. Please try again."
            : "Could not reach the backend. Check that it is running and allows this origin."),
      ),
    ),
);
