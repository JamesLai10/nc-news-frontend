import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";

function ArticleDetail() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getArticleById(article_id)
      .then((response) => {
        setArticle(response.data.article);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [article_id]);

  if (loading) {
    return <p className="loading">Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="ArticleDetail">
      <h2>{article.title}</h2>
      <p>By {article.author}</p>
      <p>Date of Post: {article.created_at.slice(0, 10)}</p>
      <p>{article.body}</p>
      {article.article_img_url && (
        <img
          src={article.article_img_url}
          alt={`An image of ${article.title}`}
        />
      )}
      <p className="Votes">Votes: {article.votes}</p>
    </div>
  );
}

export default ArticleDetail;
