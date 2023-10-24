import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-news-api-project.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles");
};

export default api;
