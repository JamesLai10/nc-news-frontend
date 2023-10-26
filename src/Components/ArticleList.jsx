import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";
import { Link } from "react-router-dom";

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    getArticles()
      .then((response) => {
        setArticles(response.data.articles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="article-list">
      <h1>News Articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.article_id}>
            <div>
              <h2 className="article-title">
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
              </h2>
              <p>
                Author: <span id="article-author">{article.author}</span>
              </p>
              <p>
                Date of Post:{" "}
                <span id="article-date">{article.created_at.slice(0, 10)}</span>
              </p>
              <p id="article-info">Topic: {article.topic}</p>
              <p id="article-info">Votes: {article.votes}</p>
            </div>
            <img
              id="article-img"
              src={article.article_img_url}
              alt={`An image of ${article.title}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArticleList;
