import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-news-api-project.onrender.com/api",
});

export const getArticles = () => {
  return api.get("/articles");
};

export const getArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`);
};

export const getCommentsByArticleId = (article_id) => {
  return api.get(`/articles/${article_id}/comments`);
};

export const updateArticleVotes = (article_id, inc_votes) => {
  return api.patch(`/articles/${article_id}`, { inc_votes });
};

export const postComment = (article_id, username, body) => {
  return api.post(`/articles/${article_id}/comments`, { username, body });
};

export const getTopics = () => {
  return api.get("/topics");
};

export const getArticlesByTopic = (topic) => {
  return api.get(`/articles?topic=${topic}`);
};

export default api;
